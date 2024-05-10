create table "public"."User" (
    "name" text,
    "id" uuid not null
);


CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

grant delete on table "public"."User" to "anon";

grant insert on table "public"."User" to "anon";

grant references on table "public"."User" to "anon";

grant select on table "public"."User" to "anon";

grant trigger on table "public"."User" to "anon";

grant truncate on table "public"."User" to "anon";

grant update on table "public"."User" to "anon";

grant delete on table "public"."User" to "authenticated";

grant insert on table "public"."User" to "authenticated";

grant references on table "public"."User" to "authenticated";

grant select on table "public"."User" to "authenticated";

grant trigger on table "public"."User" to "authenticated";

grant truncate on table "public"."User" to "authenticated";

grant update on table "public"."User" to "authenticated";

grant delete on table "public"."User" to "service_role";

grant insert on table "public"."User" to "service_role";

grant references on table "public"."User" to "service_role";

grant select on table "public"."User" to "service_role";

grant trigger on table "public"."User" to "service_role";

grant truncate on table "public"."User" to "service_role";

grant update on table "public"."User" to "service_role";


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$

BEGIN
  insert into public."User" (id)
  values (new.id);
  return new;
END;

$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_auth_user_created_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();


