
// +-------------------------+
// | Hard coded variables    |
// +-------------------------+
serversMap = ["Dev": "40.123.217.231", "Prod": "40.123.217.231"]



// +-------------------------+
// | Pipeline Parameters     |
// +-------------------------+
properties([

    // Set the build parameters
    parameters([
        choice (name: 'ENVIRONMENT', description: 'Dev or Prod', choices: 'Dev\nProd')
    ])
])


// +-------------------------+
// | Build Parameters        |
// +-------------------------+
String prmEnvironmentName   = params.ENVIRONMENT
String buildServerIpAddress = serversMap[prmEnvironmentName]



// +-------------------------+
// | Build Stages            |
// +-------------------------+
timestamps {
timeout(120) {
node (prmEnvironmentName) {

    stage ("Init") {
        banner(env.STAGE_NAME)
    }



    stage("Source control") {

        banner(env.STAGE_NAME)

        // // Clean the workspace
        // cleanWs()

        // // Clone a fresh copy of the code
        // git credentialsId: 'ffh_user', url: 'https://github.com/Haverim-Larefua/haverim-larefua-app.git'

        checkout([
            $class: 'GitSCM', 
            branches: [[name: '*/master']],
            doGenerateSubmoduleConfigurations: false,
            extensions: [],
            submoduleCfg: [],
            userRemoteConfigs: [[
                credentialsId: 'ffh_user',
                url: 'https://github.com/Haverim-Larefua/haverim-larefua-app.git'
            ]]
        ])
    }



    stage("Hooks") {

        banner(env.STAGE_NAME)

        IP = serversMap[prmEnvironmentName]
        sh "sed -i -e 's/API_URL=.*/API_URL=http:\\/\\/${IP}:3001/' .env"
    }



    stage("Compile RN") {

        banner(env.STAGE_NAME)

        // Compile the RN code
        sh "npm install"
    }



    stage("Compile App") {

        banner(env.STAGE_NAME)

        // Compile the Android code
        dir ("android") {

            sh """

                export ANDROID_SDK_ROOT=/usr/lib/android-sdk
                export PATH=\${PATH}:\${ANDROID_SDK_ROOT}/tools/bin:\${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin

                # Accept the Android licenses
                touch /home/ffh_user/.android/repositories.cfg
                yes | sdkmanager --licenses

                ./gradlew assembleRelease
            """

            sh "find . | grep apk\$"
        }
    }



    stage("Archive"){
        sh """
            mv tmp/app-release.apk tmp/FFH.apk
            docker cp tmp/FFH.apk ffh_server:/opt/app/hl/dist/assets/downloads
            rm tmp/FFH.apk
        """
    }
} // Node
} // Timeout
} // Timestamps



@NonCPS
void banner(String message) {

    if (message != null) {

        int MAX_MESSAGE_LENGTH = 100

        int messageLength = message.length();

        String dashesLine = ""

        String messageFormat

        if (messageLength <= MAX_MESSAGE_LENGTH) {

            messageFormat = '\t\t\n%s\n|     %s     |\n%s\n'

            for (int i=0 ; i<messageLength + 10 ; i++) {
                dashesLine += "-"
            }

            dashesLine = "+" + dashesLine + "+"
        }
        else {
            messageFormat = '\t\t\n%s\n|    %s\n%s\n'
            dashesLine = "+-------------"
        }

        message = String.format (messageFormat, dashesLine, message, dashesLine)
        println(message)
    }
}


