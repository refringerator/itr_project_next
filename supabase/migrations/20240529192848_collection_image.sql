create table "public"."LikeOnItem" (
    "userId" uuid not null,
    "itemId" integer not null,
    "rating" integer not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."Collection" add column "coverUrl" text;

CREATE UNIQUE INDEX "LikeOnItem_pkey" ON public."LikeOnItem" USING btree ("userId", "itemId");

alter table "public"."LikeOnItem" add constraint "LikeOnItem_pkey" PRIMARY KEY using index "LikeOnItem_pkey";

alter table "public"."LikeOnItem" add constraint "LikeOnItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."LikeOnItem" validate constraint "LikeOnItem_itemId_fkey";

alter table "public"."LikeOnItem" add constraint "LikeOnItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."LikeOnItem" validate constraint "LikeOnItem_userId_fkey";

grant delete on table "public"."LikeOnItem" to "anon";

grant insert on table "public"."LikeOnItem" to "anon";

grant references on table "public"."LikeOnItem" to "anon";

grant select on table "public"."LikeOnItem" to "anon";

grant trigger on table "public"."LikeOnItem" to "anon";

grant truncate on table "public"."LikeOnItem" to "anon";

grant update on table "public"."LikeOnItem" to "anon";

grant delete on table "public"."LikeOnItem" to "authenticated";

grant insert on table "public"."LikeOnItem" to "authenticated";

grant references on table "public"."LikeOnItem" to "authenticated";

grant select on table "public"."LikeOnItem" to "authenticated";

grant trigger on table "public"."LikeOnItem" to "authenticated";

grant truncate on table "public"."LikeOnItem" to "authenticated";

grant update on table "public"."LikeOnItem" to "authenticated";

grant delete on table "public"."LikeOnItem" to "service_role";

grant insert on table "public"."LikeOnItem" to "service_role";

grant references on table "public"."LikeOnItem" to "service_role";

grant select on table "public"."LikeOnItem" to "service_role";

grant trigger on table "public"."LikeOnItem" to "service_role";

grant truncate on table "public"."LikeOnItem" to "service_role";

grant update on table "public"."LikeOnItem" to "service_role";



