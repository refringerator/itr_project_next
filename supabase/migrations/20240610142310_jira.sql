alter table "public"."Comment" drop constraint "Comment_authorId_fkey";

alter table "public"."Comment" drop constraint "Comment_itemId_fkey";

alter table "public"."LikeOnItem" drop constraint "LikeOnItem_itemId_fkey";

alter table "public"."LikeOnItem" drop constraint "LikeOnItem_userId_fkey";

alter table "public"."User" add column "jiraUserId" text;

alter table "public"."Comment" add constraint "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."Comment" validate constraint "Comment_authorId_fkey";

alter table "public"."Comment" add constraint "Comment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Comment" validate constraint "Comment_itemId_fkey";

alter table "public"."LikeOnItem" add constraint "LikeOnItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."LikeOnItem" validate constraint "LikeOnItem_itemId_fkey";

alter table "public"."LikeOnItem" add constraint "LikeOnItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."LikeOnItem" validate constraint "LikeOnItem_userId_fkey";



