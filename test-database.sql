SQLite format 3   @    d   	   	      )                                                d .4 � � F��Lf	�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        �r##�%tableusers_stepsusers_steps	CREATE TABLE `users_steps` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `step_id` INTEGER NOT NULL REFERENCES `steps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `position` INTEGER NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL)��tablestepsstepsCREATE TABLE `steps` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `tournament_id` INTEGER NOT NULL REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL)�$�!tableusersusersCREATE TABLE `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL UNIQUE, `password_hash` VARCHAR(255), `organizer` TINYINT(1) NOT NULL DEFAULT 0, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL)P++Ytablesqlite_sequencesqlite_sequenceCREATE TABLE sqlite_sequence(name,seq)�O�!tableusersusersCREATE TABLE `users` (`id` INTEGER PRIMARY KEY AUTO
     �D##�OtabletournamentstournamentsCREATE TABLE `tournaments` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL))= indexsqlite_autoindex_users_1users�     u''�)tableSequelizeMetaSequelizeMetaCREATE TABLE `SequelizeMeta` (`name` VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY)9M' indexsqlite_autoindex_SequelizeMeta_1SequelizeMeta             ���l                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (20190913011309-create-users_steps.js   "20190913004933-create-steps.js   (20190913003755-create-tournaments.js   "20190913002303-create-users.js
      ���i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )20190913011309-create-users_steps.js   #20190913004933-create-steps.js   )20190913003755-create-tournaments.js   "20190913002303-create-users.js   ] ]�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          � #/�IIplayer Userplayer@player.com$2a$08$uwEyQXmNLTkuKdq7SnSmW.OOerAYf6kHzZaLUvhWAR0/H3iwbl6bm2019-09-14 15:31:19.819 +00:002019-09-14 15:31:19.819 +00:00  J )7�	IIdefa  : #�IINew Usernew@new.com$2a$08$LwzkrjCIOedIX6IFWDHpX.XXAP.LFJsncpanBQuKVJEPLdk5GINaK2019-09-14 15:31:25.334 +00:002019-09-14 15:31:25.334 +00:00� !	 %3�IIdefault Userdefault@default.com$2a$08$K2uPtAuUazgLSuGBgqIdbevGd0L5NRCHcREYrVZy5lRHkSozhGHg.2019-09-14 15:31:26.695 +00:002019-09-14 15:31:26.695 +00:00
   � ���                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Gplayer@player.com   1defau   (new@new.com3default@default.com!      ����                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           =tournaments   ,users_steps(	steps   	tournaments   users!   � �Z                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 �)IINew Tournament2019-09-14 15:31:23.800 +00:002019-09-14 15:31:23.800 +00:00S 1IIdefault Tournament2019-09-14 15:31:24.916 +00:002019-09-14 15:31:24.916 +00:00   � �d                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      �'   �	IINew Step2019-09-14 15:31:22.568 +00:002019-09-14 15:31:22.568 +00:00N %	IIdefault Step2019-09-14 15:31:24.927 +00:002019-09-14 15:31:24.927 +00:00                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     II2019-09-14 15:31:21.956 +00:002019-09-14 15:31:21.956 +00:00   � 	II2019-09-14 15:31:21.956 +00:002019-09-14 15:31:21.956 +00:00 D(  	II2019-09-14 15:31:24.938 +00:002019-09-14 15:31:24.938 +00:00C'  		II2019-09-14 15:31:24.938 +00:002019-09-14 15:31:24.938 +00:00