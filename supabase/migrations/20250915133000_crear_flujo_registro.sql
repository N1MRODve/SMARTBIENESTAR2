-- Función para crear empresa y usuario administrador en una sola transacción
CREATE OR REPLACE FUNCTION public.crear_empresa_con_admin(
  nombre_empresa text,
  nombre_admin text,
  email_admin text,
  password_admin text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  usuario_id uuid;
  empresa_id uuid;
  dominio text;
BEGIN
  -- Validaciones previas
  -- Verificar que el correo no esté en uso
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = email_admin) THEN
    RAISE EXCEPTION 'Ya existe un usuario con el correo electrónico %.', email_admin;
  END IF;

  -- Verificar que el nombre de empresa no esté en uso
  IF EXISTS (SELECT 1 FROM empresas WHERE nombre = nombre_empresa) THEN
    RAISE EXCEPTION 'Ya existe una empresa registrada con el nombre %.', nombre_empresa;
  END IF;

  -- Extraer dominio del correo electrónico
  dominio := substring(email_admin from position('@' in email_admin) + 1);

  -- Iniciar transacción
  BEGIN
    -- Paso 1: Crear usuario en auth.users
    INSERT INTO auth.users (
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      aud,
      role
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000', -- Valor predeterminado para instance_id
      email_admin,
      crypt(password_admin, gen_salt('bf')), -- Encriptar la contraseña
      now(), -- Confirmar correo inmediatamente
      'authenticated',
      'authenticated'
    )
    RETURNING id INTO usuario_id;

    -- Paso 2: Crear empresa
    INSERT INTO empresas (
      nombre,
      dominio_email,
      estado,
      fecha_creacion
    )
    VALUES (
      nombre_empresa,
      dominio,
      'activa',
      now()
    )
    RETURNING id INTO empresa_id;

    -- Paso 3: Crear perfil de usuario administrador
    INSERT INTO usuarios (
      id,
      empresa_id,
      tipo_usuario,
      nombre,
      apellido,
      email,
      activo
    )
    VALUES (
      usuario_id,
      empresa_id,
      'administrador',
      nombre_admin,
      '', -- Apellido vacío, ajustar según necesidades
      email_admin,
      true
    );

    -- Si todo va bien, devolvemos el ID del usuario creado
    RETURN usuario_id;
  
  EXCEPTION WHEN OTHERS THEN
    -- Si ocurre cualquier error, revertir y relanzar
    RAISE;
  END;
END;
$$;

-- Permisos para ejecutar la función
GRANT EXECUTE ON FUNCTION public.crear_empresa_con_admin(text, text, text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.crear_empresa_con_admin(text, text, text, text) TO anon;