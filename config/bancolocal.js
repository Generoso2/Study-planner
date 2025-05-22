import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarMaterias = async (materias) => {
  try {
    await AsyncStorage.setItem('@materias', JSON.stringify(materias));
  } catch (e) {
    console.error('Erro ao salvar:', e);
  }
};

const carregarMaterias = async () => {
  try {
    const materias = await AsyncStorage.getItem('@materias');
    return materias ? JSON.parse(materias) : [];
  } catch (e) {
    console.error('Erro ao carregar:', e);
    return [];
  }
};
const excluirMateria = async (id) => {
  try {
    const materias = await carregarMaterias();
    const novasMaterias = materias.filter(m => m.id !== id);
    await salvarMaterias(novasMaterias);
    return true;
  } catch (e) {
    console.error('Erro ao excluir:', e);
    return false;
  }
};

const atualizarMateria = async (id, novosDados) => {
  try {
    const materias = await carregarMaterias();
    const novasMaterias = materias.map(m => 
      m.id === id ? { ...m, ...novosDados } : m
    );
    await salvarMaterias(novasMaterias);
    return true;
  } catch (e) {
    console.error('Erro ao atualizar:', e);
    return false;
  }
};

export { salvarMaterias, carregarMaterias, excluirMateria, atualizarMateria };