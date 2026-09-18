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

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  const player = useAudioPlayer(audioUri);
  // hook reativo que força o componente a atualizar quando o áudio toca ou para
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    configurarAudio();
  }, []);

  async function configurarAudio() {
    const permission = await AudioModule.requestRecordingPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Permita o acesso ao microfone.");
      return;
    }

    await setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
    });
  }

  async function iniciarGravacao() {
    await recorder.prepareToRecordAsync();
    recorder.record();
  }

  async function pararGravacao() {
    await recorder.stop();

    if (recorder.uri) {
      setAudioUri(recorder.uri);
    }
  }

  function reproduzir() {
    if (!audioUri) {
      Alert.alert("Nenhum áudio", "Faça uma gravação primeiro.");
      return;
    }

    // Configura a velocidade para o efeito Talking Tom
    player.playbackRate = 1;
    player.play();
  }

  // Define a imagem dinamicamente com base no estado em tempo real
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
            disabled={playerStatus.playing}
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
