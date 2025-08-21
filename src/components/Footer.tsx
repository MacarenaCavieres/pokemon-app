import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#58A6A6] text-amber-200 flex md:flex-row flex-col justify-around items-center gap-10 py-20">
            <p className="text-xl font-bold">
                Developed by{" "}
                <span className="text-white" style={{ textShadow: "0 0 7px rgba(0, 191, 255, 0.7)" }}>
                    MCavieres
                </span>
            </p>
            <div className="flex gap-3 ">
                <a href="https://www.linkedin.com/in/macarena-cavieres-rubio/" target="_blank">
                    <FaLinkedin size={"2rem"} height={"2rem"} />
                </a>
                <a href="https://github.com/MacarenaCavieres" target="_blank">
                    <FaGithub size={"2rem"} height={"2rem"} />
                </a>
            </div>
        </footer>
    );
}
