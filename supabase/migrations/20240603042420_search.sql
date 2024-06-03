set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.sync_items()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Make an https request to the Typesense server
	PERFORM net.http_post(
        -- ADD TYPESENSE URL
        url := 'http://host.docker.internal:8108/collections/items/documents/import?action=upsert'::TEXT,
        -- The NEW keyword represents the new row data
        body := (
            SELECT
                to_jsonb(row.*)
            FROM (
                SELECT
                    -- Converting type TIMESTAMPTZ to type float
                    EXTRACT(EPOCH FROM NEW."updatedAt")::float AS updated_at,
                    NEW.id::TEXT as id,
                    NEW.title as title,
                    c.title as collection,
                    c.id::TEXT as collection_id,
                    array_cat(
                        ARRAY[NEW.title, c.title], 
                        array(select value::TEXT from jsonb_each(NEW."customValues"::jsonb))
                        ) AS search_text,
                    ARRAY(
                            SELECT ta.title
                            FROM "Tag" ta
                            JOIN "_ItemToTag" it ON ta.id = it."B"
                            WHERE it."A" = NEW.id
                        ) AS tags,
                    t.title as topic,
                    u.name as author
                    FROM "User" as u, "Collection" as c 
                    left JOIN "Topic" t ON c."topicId" = t.id
                    Where NEW."collectionId" = c.id and new."authorId" = u.id
            ) AS row
        )::JSONB,
        headers := json_build_object(
            'Content-Type', 'application/json',
            -- ADD API KEY
            'X-Typesense-API-KEY', '2oGo8T3CPUNewlfUuyD8LnASrjP7Hg8u'
        )::JSONB
    );
	RETURN NEW;
END;
$function$
;

-- Drop the trigger if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'sync_updates_and_inserts_in_typesense') THEN
        DROP TRIGGER sync_updates_and_inserts_in_Typesense ON "Item";
    END IF;
END $$;

CREATE TRIGGER sync_updates_and_inserts_in_typesense AFTER INSERT OR UPDATE ON public."Item" FOR EACH ROW EXECUTE FUNCTION sync_items();



