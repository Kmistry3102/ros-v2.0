import Image from "next/image";
import Container from "../ui/Container";

export default function Header() {
  return (
    <Container className="h-16 ">
        <Image src={"/r_logo_small.png"} alt="r-logo" height={10} width={10} className="w-8 h-9 lg:h-8 lg:w-8" />
    </Container>
  )
}
