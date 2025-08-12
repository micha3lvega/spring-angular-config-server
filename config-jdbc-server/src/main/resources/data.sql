	MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-default-title', 'angular-app', 'default', 'master', 'title', 'Angular application default');

MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-dev-title', 'angular-app', 'dev', 'master', 'title', 'Angular application develop');

MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-prod-title', 'angular-app', 'prod', 'master', 'title', 'Angular application');

MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-dev-debug', 'angular-app', 'dev', 'master', 'debug', 'true');

MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-prod-debug', 'angular-app', 'prod', 'master', 'debug', 'false');

MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-dev-env', 'angular-app', 'dev', 'master', 'enviroment', 'dev');

MERGE INTO PROPERTIES KEY(ID)
VALUES ('angular-app-prod-env', 'angular-app', 'prod', 'master', 'enviroment', 'prod');
