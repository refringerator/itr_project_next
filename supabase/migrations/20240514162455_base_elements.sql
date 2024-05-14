create sequence "public"."Collection_id_seq";

create sequence "public"."Comment_id_seq";

create sequence "public"."Item_id_seq";

create sequence "public"."Tag_id_seq";

create sequence "public"."Topic_id_seq";

create table "public"."Collection" (
    "id" integer not null default nextval('"Collection_id_seq"'::regclass),
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null,
    "title" text not null,
    "description" text,
    "published" boolean not null default false,
    "authorId" uuid not null,
    "topicId" integer not null
);


create table "public"."Comment" (
    "id" integer not null default nextval('"Comment_id_seq"'::regclass),
    "authorId" uuid not null,
    "itemId" integer not null,
    "text" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


create table "public"."Item" (
    "id" integer not null default nextval('"Item_id_seq"'::regclass),
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null,
    "title" text not null,
    "published" boolean not null default false,
    "authorId" uuid not null,
    "collectionId" integer not null
);


create table "public"."LikeOnComment" (
    "userId" uuid not null,
    "commentId" integer not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "rating" integer not null
);


create table "public"."Tag" (
    "id" integer not null default nextval('"Tag_id_seq"'::regclass),
    "title" text not null
);


create table "public"."Topic" (
    "id" integer not null default nextval('"Topic_id_seq"'::regclass),
    "title" text not null
);


create table "public"."_ItemToTag" (
    "A" integer not null,
    "B" integer not null
);


alter table "public"."User" add column "superuser" boolean not null default false;

alter sequence "public"."Collection_id_seq" owned by "public"."Collection"."id";

alter sequence "public"."Comment_id_seq" owned by "public"."Comment"."id";

alter sequence "public"."Item_id_seq" owned by "public"."Item"."id";

alter sequence "public"."Tag_id_seq" owned by "public"."Tag"."id";

alter sequence "public"."Topic_id_seq" owned by "public"."Topic"."id";

CREATE UNIQUE INDEX "Collection_pkey" ON public."Collection" USING btree (id);

CREATE UNIQUE INDEX "Comment_pkey" ON public."Comment" USING btree (id);

CREATE UNIQUE INDEX "Item_pkey" ON public."Item" USING btree (id);

CREATE UNIQUE INDEX "LikeOnComment_pkey" ON public."LikeOnComment" USING btree ("userId", "commentId");

CREATE UNIQUE INDEX "Tag_pkey" ON public."Tag" USING btree (id);

CREATE UNIQUE INDEX "Tag_title_key" ON public."Tag" USING btree (title);

CREATE UNIQUE INDEX "Topic_pkey" ON public."Topic" USING btree (id);

CREATE UNIQUE INDEX "Topic_title_key" ON public."Topic" USING btree (title);

CREATE UNIQUE INDEX "_ItemToTag_AB_unique" ON public."_ItemToTag" USING btree ("A", "B");

CREATE INDEX "_ItemToTag_B_index" ON public."_ItemToTag" USING btree ("B");

alter table "public"."Collection" add constraint "Collection_pkey" PRIMARY KEY using index "Collection_pkey";

alter table "public"."Comment" add constraint "Comment_pkey" PRIMARY KEY using index "Comment_pkey";

alter table "public"."Item" add constraint "Item_pkey" PRIMARY KEY using index "Item_pkey";

alter table "public"."LikeOnComment" add constraint "LikeOnComment_pkey" PRIMARY KEY using index "LikeOnComment_pkey";

alter table "public"."Tag" add constraint "Tag_pkey" PRIMARY KEY using index "Tag_pkey";

alter table "public"."Topic" add constraint "Topic_pkey" PRIMARY KEY using index "Topic_pkey";

alter table "public"."Collection" add constraint "Collection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Collection" validate constraint "Collection_authorId_fkey";

alter table "public"."Collection" add constraint "Collection_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Collection" validate constraint "Collection_topicId_fkey";

alter table "public"."Comment" add constraint "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Comment" validate constraint "Comment_authorId_fkey";

alter table "public"."Comment" add constraint "Comment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Comment" validate constraint "Comment_itemId_fkey";

alter table "public"."Item" add constraint "Item_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Item" validate constraint "Item_authorId_fkey";

alter table "public"."Item" add constraint "Item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Item" validate constraint "Item_collectionId_fkey";

alter table "public"."LikeOnComment" add constraint "LikeOnComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."LikeOnComment" validate constraint "LikeOnComment_commentId_fkey";

alter table "public"."LikeOnComment" add constraint "LikeOnComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."LikeOnComment" validate constraint "LikeOnComment_userId_fkey";

alter table "public"."_ItemToTag" add constraint "_ItemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."_ItemToTag" validate constraint "_ItemToTag_A_fkey";

alter table "public"."_ItemToTag" add constraint "_ItemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."_ItemToTag" validate constraint "_ItemToTag_B_fkey";

grant delete on table "public"."Collection" to "anon";

grant insert on table "public"."Collection" to "anon";

grant references on table "public"."Collection" to "anon";

grant select on table "public"."Collection" to "anon";

grant trigger on table "public"."Collection" to "anon";

grant truncate on table "public"."Collection" to "anon";

grant update on table "public"."Collection" to "anon";

grant delete on table "public"."Collection" to "authenticated";

grant insert on table "public"."Collection" to "authenticated";

grant references on table "public"."Collection" to "authenticated";

grant select on table "public"."Collection" to "authenticated";

grant trigger on table "public"."Collection" to "authenticated";

grant truncate on table "public"."Collection" to "authenticated";

grant update on table "public"."Collection" to "authenticated";

grant delete on table "public"."Collection" to "service_role";

grant insert on table "public"."Collection" to "service_role";

grant references on table "public"."Collection" to "service_role";

grant select on table "public"."Collection" to "service_role";

grant trigger on table "public"."Collection" to "service_role";

grant truncate on table "public"."Collection" to "service_role";

grant update on table "public"."Collection" to "service_role";

grant delete on table "public"."Comment" to "anon";

grant insert on table "public"."Comment" to "anon";

grant references on table "public"."Comment" to "anon";

grant select on table "public"."Comment" to "anon";

grant trigger on table "public"."Comment" to "anon";

grant truncate on table "public"."Comment" to "anon";

grant update on table "public"."Comment" to "anon";

grant delete on table "public"."Comment" to "authenticated";

grant insert on table "public"."Comment" to "authenticated";

grant references on table "public"."Comment" to "authenticated";

grant select on table "public"."Comment" to "authenticated";

grant trigger on table "public"."Comment" to "authenticated";

grant truncate on table "public"."Comment" to "authenticated";

grant update on table "public"."Comment" to "authenticated";

grant delete on table "public"."Comment" to "service_role";

grant insert on table "public"."Comment" to "service_role";

grant references on table "public"."Comment" to "service_role";

grant select on table "public"."Comment" to "service_role";

grant trigger on table "public"."Comment" to "service_role";

grant truncate on table "public"."Comment" to "service_role";

grant update on table "public"."Comment" to "service_role";

grant delete on table "public"."Item" to "anon";

grant insert on table "public"."Item" to "anon";

grant references on table "public"."Item" to "anon";

grant select on table "public"."Item" to "anon";

grant trigger on table "public"."Item" to "anon";

grant truncate on table "public"."Item" to "anon";

grant update on table "public"."Item" to "anon";

grant delete on table "public"."Item" to "authenticated";

grant insert on table "public"."Item" to "authenticated";

grant references on table "public"."Item" to "authenticated";

grant select on table "public"."Item" to "authenticated";

grant trigger on table "public"."Item" to "authenticated";

grant truncate on table "public"."Item" to "authenticated";

grant update on table "public"."Item" to "authenticated";

grant delete on table "public"."Item" to "service_role";

grant insert on table "public"."Item" to "service_role";

grant references on table "public"."Item" to "service_role";

grant select on table "public"."Item" to "service_role";

grant trigger on table "public"."Item" to "service_role";

grant truncate on table "public"."Item" to "service_role";

grant update on table "public"."Item" to "service_role";

grant delete on table "public"."LikeOnComment" to "anon";

grant insert on table "public"."LikeOnComment" to "anon";

grant references on table "public"."LikeOnComment" to "anon";

grant select on table "public"."LikeOnComment" to "anon";

grant trigger on table "public"."LikeOnComment" to "anon";

grant truncate on table "public"."LikeOnComment" to "anon";

grant update on table "public"."LikeOnComment" to "anon";

grant delete on table "public"."LikeOnComment" to "authenticated";

grant insert on table "public"."LikeOnComment" to "authenticated";

grant references on table "public"."LikeOnComment" to "authenticated";

grant select on table "public"."LikeOnComment" to "authenticated";

grant trigger on table "public"."LikeOnComment" to "authenticated";

grant truncate on table "public"."LikeOnComment" to "authenticated";

grant update on table "public"."LikeOnComment" to "authenticated";

grant delete on table "public"."LikeOnComment" to "service_role";

grant insert on table "public"."LikeOnComment" to "service_role";

grant references on table "public"."LikeOnComment" to "service_role";

grant select on table "public"."LikeOnComment" to "service_role";

grant trigger on table "public"."LikeOnComment" to "service_role";

grant truncate on table "public"."LikeOnComment" to "service_role";

grant update on table "public"."LikeOnComment" to "service_role";

grant delete on table "public"."Tag" to "anon";

grant insert on table "public"."Tag" to "anon";

grant references on table "public"."Tag" to "anon";

grant select on table "public"."Tag" to "anon";

grant trigger on table "public"."Tag" to "anon";

grant truncate on table "public"."Tag" to "anon";

grant update on table "public"."Tag" to "anon";

grant delete on table "public"."Tag" to "authenticated";

grant insert on table "public"."Tag" to "authenticated";

grant references on table "public"."Tag" to "authenticated";

grant select on table "public"."Tag" to "authenticated";

grant trigger on table "public"."Tag" to "authenticated";

grant truncate on table "public"."Tag" to "authenticated";

grant update on table "public"."Tag" to "authenticated";

grant delete on table "public"."Tag" to "service_role";

grant insert on table "public"."Tag" to "service_role";

grant references on table "public"."Tag" to "service_role";

grant select on table "public"."Tag" to "service_role";

grant trigger on table "public"."Tag" to "service_role";

grant truncate on table "public"."Tag" to "service_role";

grant update on table "public"."Tag" to "service_role";

grant delete on table "public"."Topic" to "anon";

grant insert on table "public"."Topic" to "anon";

grant references on table "public"."Topic" to "anon";

grant select on table "public"."Topic" to "anon";

grant trigger on table "public"."Topic" to "anon";

grant truncate on table "public"."Topic" to "anon";

grant update on table "public"."Topic" to "anon";

grant delete on table "public"."Topic" to "authenticated";

grant insert on table "public"."Topic" to "authenticated";

grant references on table "public"."Topic" to "authenticated";

grant select on table "public"."Topic" to "authenticated";

grant trigger on table "public"."Topic" to "authenticated";

grant truncate on table "public"."Topic" to "authenticated";

grant update on table "public"."Topic" to "authenticated";

grant delete on table "public"."Topic" to "service_role";

grant insert on table "public"."Topic" to "service_role";

grant references on table "public"."Topic" to "service_role";

grant select on table "public"."Topic" to "service_role";

grant trigger on table "public"."Topic" to "service_role";

grant truncate on table "public"."Topic" to "service_role";

grant update on table "public"."Topic" to "service_role";

grant delete on table "public"."_ItemToTag" to "anon";

grant insert on table "public"."_ItemToTag" to "anon";

grant references on table "public"."_ItemToTag" to "anon";

grant select on table "public"."_ItemToTag" to "anon";

grant trigger on table "public"."_ItemToTag" to "anon";

grant truncate on table "public"."_ItemToTag" to "anon";

grant update on table "public"."_ItemToTag" to "anon";

grant delete on table "public"."_ItemToTag" to "authenticated";

grant insert on table "public"."_ItemToTag" to "authenticated";

grant references on table "public"."_ItemToTag" to "authenticated";

grant select on table "public"."_ItemToTag" to "authenticated";

grant trigger on table "public"."_ItemToTag" to "authenticated";

grant truncate on table "public"."_ItemToTag" to "authenticated";

grant update on table "public"."_ItemToTag" to "authenticated";

grant delete on table "public"."_ItemToTag" to "service_role";

grant insert on table "public"."_ItemToTag" to "service_role";

grant references on table "public"."_ItemToTag" to "service_role";

grant select on table "public"."_ItemToTag" to "service_role";

grant trigger on table "public"."_ItemToTag" to "service_role";

grant truncate on table "public"."_ItemToTag" to "service_role";

grant update on table "public"."_ItemToTag" to "service_role";



