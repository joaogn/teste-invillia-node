SQLite format 3   @    7   	   	     Y                                                7 .4 " � F��L�
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   "r##�%tableusers_stepsusers_steps	CREATE TABLE `users_steps` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `step_id` INTEGER NOT NULL REFERENCES `steps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `position` INTEGER NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL)"�tablestepsstepsCREATE TABLE `steps` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `tournament_id` INTEGER NOT NULL REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL)"$�!tableusersusersCREATE TABLE `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL UNIQUE, `password_hash` VARCHAR(255), `organizer` TINYINT(1) NOT NULL DEFAULT 0, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL)P++Ytablesqlite_sequencesqlite_sequenceCREATE TABLE sqlite_sequence(name,seq)�$�KtableusersusersCREATE T
     �D##�OtabletournamentstournamentsCREATE TABLE `tournaments` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL))= indexsqlite_autoindex_users_1users�     u''�)tableSequelizeMetaSequelizeMetaCREATE TABLE `SequelizeMeta` (`name` VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY)9M' indexsqlite_autoindex_SequelizeMeta_1SequelizeMeta             ���l                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (20190913011309-create-users_steps.js   "20190913004933-create-steps.js   (20190913003755-create-tournaments.js   "20190913002303-create-users.js
      ���i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )20190913011309-create-users_steps.js   #20190913004933-create-steps.js   )20190913003755-create-tournaments.js   "20190913002303-create-users.js   ] ]�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          � #/�IIplayer Userplayer@player.com$2a$08$JLSXf6D.0RZvNCE/yYVsuu3TYi/Pe2V9XyuJXiIQL7iy4kM5IvT122019-09-14 13:34:40.985 +00:002019-09-14 13:34:40.985 +00:00  J )7  C #/�IIplayer Userplayer@player.com$2a$08$zeBpriXrtfpLHXR2EQk87u48OKeaQkZfiaKu32XqsF/f0jE8.p2Ju2019-09-14 13:34:45.034 +00:002019-09-14 13:34:45.034 +00:00� 	 %3�IIdefault Userdefault@default.com$2a$08$Fy3hoVLUZsAe0mKnFD.w6.SWNDOIHcwL2yD5iiSIalCN9g8kXdEuK2019-09-14 13:34:46.374 +00:002019-09-14 13:34:46.374 +00:00
   � ���                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Gplayer@player.com      .player@player.com3default@default.com      ����                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               � user   =tournaments   ,users_steps$	steps
   	tournaments   users   � �Z                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 �)IINew Tournament2019-09-14 13:34:44.955 +00:002019-09-14 13:34:44.955 +00:00S 1IIdefault Tournament2019-09-14 13:34:45.314 +00:002019-09-14 13:34:45.314 +00:00      �d                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      �'   �	IINew Step2019-09-14 13:34:42.395 +00:002019-09-14 13:34:42.395 +00:00   P%	IIdefault Step2019-09-14 13:34:43.744 +00:002019-09-14 13:34:43.744 +00:00                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   F II2019-09-13 01:52:38.837 +00:002019-09-13 01:52:38.837 +00:00F II2019-09-13 01:52:28.792 +00:002019-09-13 01:52:28.792 +00:    II2019-09-14 13:34:40.825 +00:002019-09-14 13:34:40.825 +00:00   � 	II2019-09-14 13:34:40.825 +00:002019-09-14 13:34:40.825 +00:00    � 	II2019-09-14 13:34:43.755 +00:002019-09-14 13:34:43.755 +00:00   E 		II2019-09-14 13:34:43.755 +00:002019-09-14 13:34:43.755 +00:00