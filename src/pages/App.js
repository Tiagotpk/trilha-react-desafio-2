import { useState } from "react";
import gitLogo from "../assets/github.png";
import Input from "../components/input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import { Container } from "./styles";
import { api } from "../services/api";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    if (!currentRepo.trim()) {
      alert("Por favor, insira o nome de um repositório.");
      return;
    }

    try {
      const { data } = await api.get(`repos/${currentRepo}`);

      if (data.id) {
        const isExist = repos.find((repo) => repo.id === data.id);
        if (!isExist) {
          setRepos((prev) => [...prev, data]);
          setCurrentRepo("");
          return;
        }
      }
      alert("Repositório não encontrado!!");
    } catch (error) {
      console.error("Erro ao buscar o repositório:", error);
      alert("Erro ao buscar o repositório!");
    }
  };


  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={gitLogo} alt="github logo" width={72} height={72} />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} disabled={!currentRepo.trim()} />
      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
