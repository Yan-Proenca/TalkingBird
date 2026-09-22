import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

import AudioButton from "../../components/AudioButton";
import Header from "../../components/Header";
import RecordingStatus from "../../components/RecordingStatus";

import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

export default function GravacaoScreen() {
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  const player = useAudioPlayer(audioUri);
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    configurarAudio();
  }, []);

  async function configurarAudio() {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permissão necessária", "Permita o acesso ao microfone.");
        setHasPermission(false);
        return;
      }

      setHasPermission(true);

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
    } catch (error) {
      console.error("Erro ao configurar áudio:", error);
    }
  }

  async function iniciarGravacao() {
    if (!hasPermission) {
      Alert.alert("Erro", "Permissão para gravação de áudio não concedida.");
      return;
    }

    try {
      await recorder.prepareToRecordAsync();
      await recorder.record(); // Corrigido: adicionado await
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      Alert.alert("Erro", "Não foi possível iniciar a gravação.");
    }
  }

  async function pararGravacao() {
    try {
      await recorder.stop();

      if (recorder.uri) {
        setAudioUri(recorder.uri);
      }
    } catch (error) {
      console.error("Erro ao parar gravação:", error);
    }
  }

  async function reproduzir() {
    if (!audioUri) {
      Alert.alert("Nenhum áudio", "Faça uma gravação primeiro.");
      return;
    }

    try {
      // Garante que o modo de áudio permita reprodução
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      player.playbackRate = 1;
      player.play();
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
      Alert.alert("Erro", "Falha ao reproduzir o áudio.");
    }
  }

  function obterImagemEstado() {
    if (recorderState.isRecording) {
      return require("../../assets/playing.png");
    }
    if (playerStatus.playing) {
      return require("../../assets/idle.png");
    }
    return require("../../assets/recording.png");
  }

  return (
    <View style={styles.container}>
      <Header title="Talking Bird" subtitle="Fale com o AngryBird" />

      <View style={styles.imageContainer}>
        <Image
          source={obterImagemEstado()}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>

      <RecordingStatus isRecording={recorderState.isRecording} />

      <View style={styles.controlsContainer}>
        {recorderState.isRecording ? (
          <AudioButton
            title="Parar gravação"
            variant="danger"
            onPress={pararGravacao}
          />
        ) : (
          <AudioButton
            title="Gravar"
            onPress={iniciarGravacao}
            disabled={playerStatus.playing || !hasPermission}
          />
        )}

        <AudioButton
          title="Reproduzir"
          variant="secondary"
          disabled={
            !audioUri || recorderState.isRecording || playerStatus.playing
          }
          onPress={reproduzir}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101014",
    padding: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  characterImage: {
    width: 400,
    height: 400,
  },
  controlsContainer: {
    gap: 16,
    paddingBottom: 24,
  },
});
