alter table "public"."User" add column "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP;

alter table "public"."User" add column "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP;

CREATE
OR REPLACE FUNCTION public.handle_new_user () RETURNS TRIGGER AS $$

BEGIN
  -- Insert or update the 'User' table with the new 'id' and 'name' from 'raw_user_meta_data'
  INSERT INTO public."User" (id, name, "updatedAt")
  VALUES (NEW.id,
          CASE 
                WHEN NEW.raw_user_meta_data->>'custom_name' IS NOT NULL  THEN NEW.raw_user_meta_data->>'custom_name'
                WHEN NEW.raw_user_meta_data->>'full_name' IS NOT NULL  THEN NEW.raw_user_meta_data->>'full_name'
                WHEN NEW.raw_user_meta_data->>'name' IS NOT NULL  THEN NEW.raw_user_meta_data->>'name'
                WHEN NEW.raw_user_meta_data->>'preferred_username' IS NOT NULL  THEN NEW.raw_user_meta_data->>'preferred_username'
                WHEN NEW.raw_user_meta_data->>'user_name' IS NOT NULL  THEN NEW.raw_user_meta_data->>'user_name'
              ELSE 'Unknown' 
          END, now())
  ON CONFLICT (id) 
  DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  
  RETURN NEW;
END;

$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_trigger ON auth.users;

CREATE TRIGGER on_auth_user_created_trigger
AFTER INSERT
OR
UPDATE ON auth.users FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user ();



