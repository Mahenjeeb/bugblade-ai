import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  CodeXml,
  Github,
  Map,
  NotebookText,
  SquareTerminal,
  Terminal,
  TextAlignJustify,
  User2Icon,
} from "lucide-react";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const NavBar = () => {
  // const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const btnProperties = {
    btnClassName:
      "bg-transparent text-white hover:bg-transparent hover:text-green-500",
    btnSize: "sm",
    variant: "outline",
  };

  return (
    <>
      <div className={"w-full"}>
        <nav className={"w-full bg-[#1b1b1f] py-1 px-8"}>
          <div className="flex lg:justify-between gap-3">
            <TextAlignJustify
              className="lg:hidden mt-3 h-5 text-white"
              onClick={() => setIsOpen(!isOpen)}
            />
            <Link to={"/"} className="gap-2 p-2 flex cursor-pointer">
              {/* <Button
                size="icon"
                className="bg-gray-700 rounded-none hover:bg-gray-700"
              >
                <Avatar className="flex gap-2">
                  <AvatarImage
                    src="../src/images/CompilerX-logo.png"
                    className="lg:h-6 h-4"
                  />
                </Avatar>
              </Button> */}
              <h1
                className="text-green-500 font-bold lg:text-3xl text-xl tracking-widest"
                style={{ fontFamily: "monospace" }}
              >
                CompilerX
              </h1>
            </Link>
            {/* Desktop View */}
            <div className="gap-2 p-2 lg:flex justify-end text-white hidden">
              <Link to="/">
                <Button
                  size={btnProperties.btnSize}
                  className={btnProperties.btnClassName}
                >
                  <SquareTerminal />
                  Code Editor
                </Button>
              </Link>
              <Button
                size={btnProperties.btnSize}
                className={btnProperties.btnClassName}
              >
                <NotebookText />
                Cheat Sheets
              </Button>
              <Button
                size={btnProperties.btnSize}
                className={btnProperties.btnClassName}
              >
                <Map />
                Road Maps
              </Button>
              <div className="border-l-2 pl-3 border-zinc-700 flex gap-3">
                <Link
                  to={"https://github.com/Mahenjeeb/bugblade-ai"}
                  target="blanck"
                  title="CompilerX Github"
                >
                  <Button
                    size="icon"
                    className="bg-zinc-700 text-white rounded-full hover:bg-gray-600"
                  >
                    <Github />
                  </Button>
                </Link>
                <Button
                  size={btnProperties.btnSize}
                  className="bg-blue-700 rounded-none hover:bg-blue-600"
                >
                  <User2Icon />
                  Login
                </Button>
              </div>
            </div>

            {/* Mobile view */}
            {isOpen && (
              <div className="absolute inset-x-0 top-0 w-[75%] h-full bg-[#1b1b1f] lg:hidden">
                <div className="flex flex-col p-5">
                  <Link to={"/"} className="flex gap-3 items-center">
                    <TextAlignJustify
                      className="lg:hidden h-5 text-white flex items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                    <h2
                      className="text-green-500 font-bold lg:text-3xl text-xl tracking-widest"
                      style={{ fontFamily: "monospace" }}
                    >
                      CompilerX
                    </h2>
                  </Link>
                  <div className="mt-5 text-white text-sm font-semibold">
                    {/* <Link to="/" className="flex items-center py-2 gap-3">
                      <SquareTerminal className="h-5" />
                      <span>Code Editor</span>
                    </Link> */}
                    <Link to="/" className="flex items-center py-2 gap-3">
                      <NotebookText className="h-5" />
                      <span>Cheat Sheets</span>
                    </Link>
                    <Link to="/" className="flex items-center py-2 gap-3">
                      <Map className="h-5" />
                      <span>Road Maps</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
