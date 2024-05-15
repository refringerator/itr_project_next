alter table "public"."Topic" add column "translation" jsonb not null default '[]'::jsonb;

INSERT INTO
  "public"."Topic" ("title", "translation")
VALUES
  (
    'Links',
    '[{"col": "title", "l": "ru_RU", "t": "Ссылки"}]'
  ),
  (
    'Rants',
    '[{"col": "title", "l": "ru_RU", "t": "Разглагольствования"}]'
  ),
  (
    'Tasks',
    '[{"col": "title", "l": "ru_RU", "t": "Задачи"}]'
  ),
  (
    'Interview questions',
    '[{"col": "title", "l": "ru_RU", "t": "Вопросы на собеседовании"}]'
  ),
  ('PHP', '[]');
