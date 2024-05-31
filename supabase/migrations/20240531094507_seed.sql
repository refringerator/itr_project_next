--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."User" ("name", "id", "superuser", "createdAt", "updatedAt") VALUES
	('Swanson', '5861e90d-fa28-43e3-8346-ac30b1ef3abb', false, '2024-05-31 07:06:40.095', '2024-05-31 08:22:20.789'),
	('Johnson', 'e25b07f5-0ffa-48ee-8537-94a35adbfc9a', false, '2024-05-31 08:22:44.085', '2024-05-31 08:23:11.793'),
	('Botaniq', '05b1c86b-625c-4758-a5d4-c1ee147ddb91', false, '2024-05-31 08:44:09.978', '2024-05-31 08:44:30.481'),
	('Ziaja', 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', false, '2024-05-31 09:08:24.046', '2024-05-31 09:09:45.228');


--
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Collection" ("id", "createdAt", "updatedAt", "title", "description", "published", "authorId", "topicId", "coverUrl") VALUES
	(1, '2024-05-31 07:12:31.714', '2024-05-31 07:24:43.463', 'Some notes about coding', 'Some unordered but useful notes about coding, hints, analogies, etc.', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, ''),
	(2, '2024-05-31 07:53:57.059', '2024-05-31 07:53:57.059', 'Замечания о кодировании', 'Некоторые неупорядоченные, но полезные замечания о кодировании, подсказки, аналогии и т.п.', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, ''),
	(3, '2024-05-31 08:24:38.417', '2024-05-31 08:24:38.417', 'Useful links', '', false, 'e25b07f5-0ffa-48ee-8537-94a35adbfc9a', 1, ''),
	(4, '2024-05-31 08:45:06.331', '2024-05-31 08:45:06.331', 'Interview', '', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 4, ''),
	(5, '2024-05-31 08:52:03.755', '2024-05-31 08:52:28.5', 'How can the following code be extended to print the string "2 + 2 == 5" ', 'Just a crazy question to think about; you know, be prepared.

However, you should not really worry if you are unable to think of anything. The only real reason to ask such a question during an interview is to perform "stress testing" to check whether you are stress-resistant and to verify that you wouldn''t cry or throw a tantrum if you got an atypical problem.

How can the following code be extended to print the string "2 + 2 == 5" (to force the execution of the if body)? You may add some code where the one of comments is placed. Choose your language and try to come up with a solution.

Ruby

```
# ???
x = 5
if 2 + 2 == x
  puts("2 + 2 = 5")
end
```
JS
```
// ???
x = 5;
if (2 + 2 === x) {
    console.log("2 + 2 = 5");
}
```

Python

```
# ???
x = 5
if 2 + 2 == x:
    print("2 + 2 = 5")
```
', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 3, ''),
	(6, '2024-05-31 09:10:45.55', '2024-05-31 09:10:45.55', 'Raaants', '', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 2, ''),
	(7, '2024-05-31 09:15:55.688', '2024-05-31 09:15:55.688', 'Opt tasks', '', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 3, ''),
	(8, '2024-05-31 09:27:37.607', '2024-05-31 09:27:37.607', 'Советы', '', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 2, '');


--
-- Data for Name: Item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Item" ("id", "createdAt", "updatedAt", "title", "published", "authorId", "collectionId", "customValues") VALUES
	(1, '2024-05-31 07:13:33.3', '2024-05-31 07:25:16.941', 'test edge cases', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 1, '{"cf_1": "It''s a great idea to test edge cases — some arguments/parameters/states/etc. For example, zero number of arguments when arbitrary number of arguments are expected, empty array, empty string, min/max values of your types, values less/greater than supported min/max, etc. And, of course, null value. \n\nIt doesn''t mean that corresponding checks should always be explicitly placed in your code. Explicity is good thing, but, of course, sometimes you may overcook your vegetables. \n\nIf in doubt, add a check. ", "cf_2": ":brain:"}'),
	(2, '2024-05-31 07:51:36.334', '2024-05-31 07:51:36.334', 'About overcooked vegetables', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 1, '{"cf_1": "About overcooked vegetables. Let''s say you have something like this:\n```\ndef method(arg):\n    arg.implementation()\n```\n\nDo you really need to explicitly check the `arg` value for the `None` (or `null`, or `nil`, or `undefined`—choose your poison) before the call a method on it? Not really.\n\nBut in general, the idea about edge case checks is a good one.\n", "cf_2": ":brain:"}'),
	(3, '2024-05-31 07:52:49.792', '2024-05-31 07:52:49.792', 'Invalid data entry from the alive breathing user is expected', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 1, '{"cf_1": "Please note that invalid data entry from the alive breathing user is expected situation, not an exceptional one. You need to show some nice message, not throw an exception.\n", "cf_2": ":brain:"}'),
	(4, '2024-05-31 07:54:20.478', '2024-05-31 07:54:20.478', 'Это хорошая идея проверить крайние случаи', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, '{"cf_3": "Это хорошая идея проверить крайние случаи — какие-либо аргументы/параметры/состояние/т.д. Например, ноль аргументов в случае произвольного числа аргументов, пустой массив, пустую строку, минимальное/максимальное значения ваших типов, значения меньше/больше минимально/максимально поддерживаемого и т.д. И, конечно, значение null.\n\nЭто не означает, что соответствующие проверки должны быть всегда явно помещены в код, и хотя \"явность\" — это хорошо, но, конечно, иногда овощи можно пережарить. \n\nЕсли сомневаетесь, добавляйте проверку.", "cf_4": ":brain:"}'),
	(5, '2024-05-31 07:55:31.51', '2024-05-31 07:55:31.51', 'О пережаренных овощах', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, '{"cf_3": "О пережаренных овощах. Допустим, у вас есть что-то вроде:\n```python\ndef method(arg):\n    arg.implementation()\n```\n\nНужно ли добавлять явную проверку значения `arg` на `None` (или `null`, или `nil`, или `undefined`) перед вызовом на нем метода? Не обязательно.\n\nНо в общем, идея о проверках крайних случаев является дельной.", "cf_4": ":brain:"}'),
	(6, '2024-05-31 07:56:17.325', '2024-05-31 07:56:17.325', 'Неправильный ввод со стороны живого пользователя из мяса — это ожидаемая', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, '{"cf_3": "Обратите внимание, что неправильный ввод со стороны живого пользователя из мяса — это ожидаемая] ситуация, а не исключительная. Нужно показать аккуратное сообщение, а не сгенерировать исключение.", "cf_4": ":brain:"}'),
	(7, '2024-05-31 07:56:58.642', '2024-05-31 07:56:58.642', 'Дублирование — зло.', false, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, '{"cf_3": "Дублирование — зло. Мамой клянусь."}'),
	(10, '2024-05-31 08:41:35.534', '2024-05-31 08:41:35.534', '90DaysOfDevOps ', false, 'e25b07f5-0ffa-48ee-8537-94a35adbfc9a', 3, '{"cf_5": "[https://github.com/MichaelCade/90DaysOfDevOps](https://github.com/MichaelCade/90DaysOfDevOps)"}'),
	(8, '2024-05-31 08:04:16.673', '2024-05-31 08:20:36.268', 'Проще — лучше', true, '5861e90d-fa28-43e3-8346-ac30b1ef3abb', 2, '{"cf_3": "Проще — лучше. Не переусложняйте. \nЗамечание: \"проще\" — это не поместить всё вместе или написать один длинный метод."}'),
	(11, '2024-05-31 08:42:24.306', '2024-05-31 08:42:24.306', 'One of the best sources about Symfony', false, 'e25b07f5-0ffa-48ee-8537-94a35adbfc9a', 3, '{"cf_5": "One of the best sources about Symfony:  [https://symfony.com/doc/6.2/the-fast-track/en/index.html](https://symfony.com/doc/6.2/the-fast-track/en/index.html)"}'),
	(12, '2024-05-31 08:42:56.546', '2024-05-31 08:42:56.546', 'PHP in general', false, 'e25b07f5-0ffa-48ee-8537-94a35adbfc9a', 3, '{"cf_5": "PHP in general: [https://phptherightway.com/](https://phptherightway.com/)"}'),
	(16, '2024-05-31 08:49:29.984', '2024-05-31 08:49:29.984', '"not so ideal" design choices Python', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 4, '{"cf_6": "- `len` global function;\n- `dunders` (magic methods);\n- `map` function is globally available, but `reduce` function is in `functools` module."}'),
	(9, '2024-05-31 08:39:04.763', '2024-05-31 08:40:47.777', 'The Beginner''s Guide to React', false, 'e25b07f5-0ffa-48ee-8537-94a35adbfc9a', 3, '{"cf_5": "The Beginner''s Guide to React: [https://egghead.io/courses/the-beginner-s-guide-to-react](https://egghead.io/courses/the-beginner-s-guide-to-react) (in fact, all courses from [https://kentcdodds.com/courses](https://kentcdodds.com/courses) are pretty good, but they are paid). Study at least the free one."}'),
	(13, '2024-05-31 08:46:14.763', '2024-05-31 08:46:14.763', '"not so ideal" design choices', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 4, '{"cf_6": "There are several \"not so ideal\" design choices that may seem arguable in retrospect, but when Java was out, there was a very different technological landscape:\n\n- checked exceptions (some may argue that this is the greatest Java feature);\n- suboptimal integration of primitives into the Java type system (there is a lot to talk about here—code duplication, generics, limited types in streams, etc.);\n- absence of unsigned integer types (more about it later);\n- arrays and collections are not very compatible."}'),
	(14, '2024-05-31 08:47:32.08', '2024-05-31 08:47:32.08', '"not so ideal" C#', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 4, '{"cf_6": "- bloated syntax (LINQ, delegates vs. anonymous methods vs. lambdas, different ways to initialize a property, etc.);\n- static (non-virtual) operator overloading;\n- intricate object equality comparison implementation (override `Equals` and `GetHashCode`, implement `IEquatable<T>`, overload `==` and `!=`);\n- ref and out parameters (almost universally mean the method is trying to do too much)."}'),
	(15, '2024-05-31 08:48:34.831', '2024-05-31 08:48:34.831', '"not so ideal" design choices PHP', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 4, '{"cf_6": "- inconsistent naming (gettype vs. get_class, intval vs. strtolower vs. deg2rad, etc.);\n- current function;\n- unlike most other programming languages, the ternary operator is left associative."}'),
	(17, '2024-05-31 09:05:58.726', '2024-05-31 09:05:58.726', 'PYTHON', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 5, '{"cf_7": "```\nclass A:\n    def __del__(self):\n        global x\n        x -= 1\nx = A()\n\nx = 5\nif 2 + 2 == x:\n    print(\"2 + 2 = 5\")\n```", "cf_8": "PYTHON"}'),
	(18, '2024-05-31 09:06:27.799', '2024-05-31 09:06:27.799', 'RUBY', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 5, '{"cf_7": "```\nclass Integer\n    def ==(other)\n        other.equal?(5)\n    end\nend\n\nx = 5\nif 2 + 2 == x\n  puts(\"2 + 2 = 5\")\nend\n```", "cf_8": "RUBY"}'),
	(19, '2024-05-31 09:06:52.028', '2024-05-31 09:06:52.028', 'JS', false, '05b1c86b-625c-4758-a5d4-c1ee147ddb91', 5, '{"cf_7": "```\nObject.defineProperty(globalThis, ''x'', {get: () => 4});\n\nx = 5;\nif (2 + 2 === x) {\n    console.log(\"2 + 2 = 5\");\n}\n```", "cf_8": "JS"}'),
	(20, '2024-05-31 09:11:05.603', '2024-05-31 09:11:05.603', 'Separate "commands"', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 6, '{"cf_9": "Separate \"commands\" (methods that change an object) from \"queries\" (methods asking the object a question) in your functions. Query method like property accessor should not alter the observable object state. "}'),
	(21, '2024-05-31 09:14:18.221', '2024-05-31 09:14:18.221', 'OOP', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 6, '{"cf_9": "An object A can call a method of an object B, but object A should not reach through object B to access yet another object C to call its methods. Doing so would mean that object A implicitly requires greater knowledge of object B''s internal structure. If you want the dog to run, it does not make sense to command his paws, it''s better to give the command to the dog that will deal with his paws by itself."}'),
	(22, '2024-05-31 09:15:02.629', '2024-05-31 09:15:14.396', 'Duplication is the root of all evil', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 6, '{"cf_9": "Duplication is the root of all evil. OK. There is a \"rule of three\" — \"Three strikes and you refactor\". It states that two instances of similar code do not necessarly require refactoring (it''s really not a good sign though), but when similar code is used three times, it **should** be extracted into a new function."}'),
	(23, '2024-05-31 09:17:10.192', '2024-05-31 09:17:10.192', 'Another optional puzzle', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 7, '{"cf_10": "(it''s more about passing interviews than programming, but it could be interesting). You have 3 boolean inputs (X, Y, Z), arbitrary number of OR elements, arbitrary number of AND elements and only 2 (two) NOT elements. You need to calculate NOT(X), NOT(Y), NOT(Z). Please, note that you cannot define some function MyNOT = NOT and re-use it, you have only 2 possible calls to NOT (imagine that you build a hardware implementation and have only 2 inverters).  "}'),
	(24, '2024-05-31 09:19:50.241', '2024-05-31 09:19:50.241', 'SECOND OPTIONAL SMALL PUZZLE', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 7, '{"cf_10": "SECOND OPTIONAL SMALL PUZZLE without the number (just for fun — if you like use code for solving math problems; it''s arguably will not teach you anything as a coder, but just to flex your \"engineering\" muscles and to learn how to design algorithms)\n\nFind the longest natural number represented in hex as d₁d₂d₃...dₙ (each dᵢ is a single hex digit; repetitions are possible) such that d₁d₂...dₖ when divided by k gives the remainder k-1 for all k≤n and the middle digit of the number is 3."}'),
	(25, '2024-05-31 09:27:54.079', '2024-05-31 09:27:54.079', 'Исключительную ситуации', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 8, '{"cf_11": "Чем раньше вы сгенерируете исключительную ситуацию, тем лучше. Лучше остановить нормальную работу, чем пытаться продолжить ошибочные вычисления."}'),
	(26, '2024-05-31 09:28:16.073', '2024-05-31 09:28:16.073', 'Выравнивание текста', false, 'd0d8c762-53ff-4b2f-8fd3-ac8739b9b3a7', 8, '{"cf_11": "Текст редко должен быть выровнен по центру (кроме кнопок, конечно). В таблицах нужно выравнивать текст по левому краю (только в системах письменности left-to-right, конечно). Но числа, наоборот, должны быть выровнены по правому краю. Конечно, есть другие исключения в таблциах (вроде дат в формате \"фиксированной ширины\"), но они, еще раз, редкие."}');


--
-- Data for Name: CustomField; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."CustomField" ("id", "type", "isFilter", "isRequired", "collectionId", "title") VALUES
	(2, 'TEXT', true, false, 1, 'Emoji'),
	(1, 'LONGTEXT', false, false, 1, 'Description'),
	(3, 'LONGTEXT', false, false, 2, 'Описание'),
	(4, 'TEXT', false, false, 2, 'Эможи'),
	(5, 'LONGTEXT', false, false, 3, 'Description'),
	(6, 'LONGTEXT', false, true, 4, 'Description'),
	(7, 'LONGTEXT', false, true, 5, 'Solution'),
	(8, 'TEXT', false, true, 5, 'language'),
	(9, 'LONGTEXT', false, true, 6, 'Description'),
	(10, 'LONGTEXT', false, true, 7, 'Description'),
	(11, 'LONGTEXT', false, true, 8, 'Описание');


INSERT INTO "public"."Tag" ("id", "title") VALUES
	(1, 'KISS'),
	(2, 'brain'),
	(3, 'JS'),
	(4, 'REACT'),
	(5, 'DEVOPS'),
	(6, 'PHP'),
	(7, 'SYMFONY'),
	(8, 'JAVA'),
	(9, 'C#'),
	(10, 'PYTHON'),
	(11, 'RUBY'),
	(12, 'OOP');


--
-- Data for Name: _ItemToTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."_ItemToTag" ("A", "B") VALUES
	(8, 1),
	(8, 2),
	(9, 3),
	(9, 4),
	(10, 5),
	(11, 6),
	(11, 7),
	(12, 6),
	(13, 8),
	(14, 9),
	(15, 6),
	(16, 10),
	(17, 10),
	(18, 11),
	(19, 3),
	(21, 12),
	(22, 1);
