import {NextPage} from "next";
import {useRouter} from "next/router";
import {Container} from "@mui/material";

const Characters: NextPage<any> = ({ country }) => {
  const router = useRouter()
  console.log('router', router.query)
  return (
    <Container maxWidth="lg">
      <img src={country.currentFlag} />
      <h3>{country.name}</h3>
    </Container>
  )
}

export default Characters;
