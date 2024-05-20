create type "public"."CustomFieldType" as enum ('INT', 'BOOLEAN', 'TEXT', 'LONGTEXT', 'DATE', 'LINK', 'FILE');

create sequence "public"."CustomField_id_seq";

create table "public"."CustomField" (
    "id" integer not null default nextval('"CustomField_id_seq"'::regclass),
    "type" "CustomFieldType" not null default 'TEXT'::"CustomFieldType",
    "isFilter" boolean not null,
    "isRequired" boolean not null,
    "collectionId" integer not null,
    "title" text not null
);


alter table "public"."Item" add column "customValues" jsonb not null default '{}'::jsonb;

alter sequence "public"."CustomField_id_seq" owned by "public"."CustomField"."id";

CREATE UNIQUE INDEX "CustomField_pkey" ON public."CustomField" USING btree (id);

alter table "public"."CustomField" add constraint "CustomField_pkey" PRIMARY KEY using index "CustomField_pkey";

alter table "public"."CustomField" add constraint "CustomField_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."CustomField" validate constraint "CustomField_collectionId_fkey";

grant delete on table "public"."CustomField" to "anon";

grant insert on table "public"."CustomField" to "anon";

grant references on table "public"."CustomField" to "anon";

grant select on table "public"."CustomField" to "anon";

grant trigger on table "public"."CustomField" to "anon";

grant truncate on table "public"."CustomField" to "anon";

grant update on table "public"."CustomField" to "anon";

grant delete on table "public"."CustomField" to "authenticated";

grant insert on table "public"."CustomField" to "authenticated";

grant references on table "public"."CustomField" to "authenticated";

grant select on table "public"."CustomField" to "authenticated";

grant trigger on table "public"."CustomField" to "authenticated";

grant truncate on table "public"."CustomField" to "authenticated";

grant update on table "public"."CustomField" to "authenticated";

grant delete on table "public"."CustomField" to "service_role";

grant insert on table "public"."CustomField" to "service_role";

grant references on table "public"."CustomField" to "service_role";

grant select on table "public"."CustomField" to "service_role";

grant trigger on table "public"."CustomField" to "service_role";

grant truncate on table "public"."CustomField" to "service_role";

grant update on table "public"."CustomField" to "service_role";



