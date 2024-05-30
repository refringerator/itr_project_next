insert into storage.buckets
  (id, name, public)
values
  ('collection', 'collection', true)
on conflict(id) do nothing;

-- Check if the policy exists and drop it if it does
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'storage'
        AND tablename = 'objects'
        AND policyname = 'Allow authenticated uploads'
    ) THEN
        EXECUTE 'DROP POLICY "Allow authenticated uploads" ON storage.objects';
    END IF;
END $$;

create policy "Allow authenticated uploads"
on storage.objects for insert to authenticated with check (
    bucket_id = 'collection'
);