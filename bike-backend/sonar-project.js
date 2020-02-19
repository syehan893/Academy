const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:9000',
       options : {
        'sonar.login':'admin',
        'sonar.password':'admin',
        'sonar.sources': '.',
        'sonar.inclusions' : 'src/**'
       }
     }, () => {});