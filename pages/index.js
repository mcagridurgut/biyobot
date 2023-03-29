import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";

// In your component
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState(
    "kemosentezin fotosentezden farkı nedir?"
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [sourceData, setSourceData] = useState(null);
  const [ph, setPh] = useState("Kemosentezin fotosentezden farkı nedir?");
  const [seeSources, setSeeSources] = useState(false);
  const [openedItemIndex, setOpenedItemIndex] = useState(0);
  const [questionsLeft, setQuestionsLeft] = useState(0);
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user, googleLogin, logout } = useAuth();
  const endpoint = process.env.API_ENDPOINT || "https://bilkentpc.com";

  const color = "bg-gray-400";
  const bgImage = "/1.jpg";

  const updateLimit = async () => {
    const token = await user.getIdToken().then((token) => token);
    const response = await fetch(`${endpoint}/limit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    setQuestionsLeft(data.usage_limit);
  };

  useEffect(() => {
    if (user) {
      updateLimit();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) {
      setError(true);
      return;
    }

    // if user is not logged in, signinwithgoogle
    if (!user) {
      await googleLogin();
    } else {
      const token = await user.getIdToken().then((token) => token);
      setLoading(true);
      setError(false);
      try {
        // send a request to the server

        const response = await fetch(`${endpoint}/ask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ question: inputValue }),
        });

        // get the response from the server
        const data = await response.json();
        setData(data);
        setQuestionsLeft(data.usage_limit);
        setInputValue("");
        setPh(inputValue);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Head>
        <title>Home | BiyoBot</title>
        <meta name="keywords" content="biyobot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className="h-[100vh] overflow-y-auto
        "
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            // darken the image
            // backgroundColor: "rgba(0,0,0,0.8)",
            // backgroundBlendMode: "darken",
          }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-between items-center transition-all duration-300 ease-in-out">
            <div
              className={`navbar flex items-center justify-between pt-3 px-5 pb-2 w-full h-[8vh] mb-2`}
            >
              <h1
                className=" text-white font-comfortaa text-4xl font-thin select-none drag-none"
                onClick={() => {
                  setData(null);
                }}
              >
                biyobot
              </h1>

              <div className="hidden lg:flex ml-5">
                <a
                  onClick={() => setAbout(!about)}
                  className="ml-5 text-white font-comfortaa text-xl font-thin hover:text-[#CEEC97] hover:cursor-pointer hover:transform hover:scale-110 transition-all duration-300 ease-in-out "
                >
                  Hakkında
                </a>
                <a
                  onClick={() => setContact(!contact)}
                  className="ml-5 text-white font-comfortaa text-xl font-thin hover:text-[#CEEC97] hover:cursor-pointer hover:transform hover:scale-110 transition-all duration-300 ease-in-out "
                >
                  İletişim
                </a>
                <a
                  onClick={() => {
                    user ? logout() : googleLogin();
                  }}
                  className="ml-5 text-white font-comfortaa text-xl font-thin hover:text-[#CEEC97] hover:cursor-pointer hover:transform hover:scale-110 transition-all duration-300 ease-in-out "
                >
                  {user ? "Çıkış" : "Giriş"}
                </a>
              </div>
              {/* hamburger menu */}
              <div
                className="lg:hidden hover:cursor-pointer hover:transform hover:scale-110 transition-all duration-300 ease-in-out"
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                  setContact(false);
                  setAbout(false);
                }}
              >
                {!mobileMenu ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center mb-10">
              <form
                className={"w-full flex justify-center items-center mb-5"}
                onSubmit={handleSubmit}
              >
                <input
                  className={`h-fit transition-all duration-300 ease-in-out mr-2 p-3
                  text-bold rounded-lg font-comfortaa font-bold
                  w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[65%]
                  hover:bg-opacity-90 text-xs sm:text-md md:text-lg lg:text-xl xl:text-2xl text-[#e4dacf]
                  bg-black bg-opacity-80 focus:outline-none focus:ring-2 border-2 border-[#523E28] focus:ring-[#CEEC97] focus:border-transparent`}
                  type="text"
                  placeholder={ph}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  className={` h-full p-3 hover:bg-[#CEEC97] hover:text-black rounded-lg text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl bg-[#423E28] text-white font-comfortaa font-bold`}
                  type="submit"
                >
                  Sor!
                </button>{" "}
              </form>
              {data && (
                <div
                  className={` ${color} flex flex-col lg:flex-row rounded-2xl bg-opacity-40 w-full`}
                >
                  <div
                    className={`flex flex-col items-center lg:w-[65%] w-full h-full font-comfortaa justify-start my-[1rem]`}
                  >
                    {data && (
                      <>
                        <div className="w-full flex justify-center pb-[1rem] sm:text-2xl text-lg">
                          {" "}
                          Cevap
                        </div>
                        <div className="sm:mx-10 mx-1 p-3 rounded-lg bg-[#423E28] text-white">
                          {data.answer}
                        </div>
                      </>
                    )}
                  </div>
                  {data && (
                    <div className="lg:w-[35%] w-full flex flex-col py-[1rem] rounded-2xl lg:rounded-tl-none lg:rounded-bl-none bg-lime-900 bg-opacity-90 ">
                      <div className="w-full flex justify-center pb-[1rem] font-comfortaa sm:text-2xl text-lg">
                        {" "}
                        Kaynaklar
                      </div>
                      <div
                        className=" 
                    h-full p-3 rounded-xl lg:rounded-br-none lg:rounded-tr-none  text-md lg:w-[100%] w-[90%] mx-auto font-comfortaa font-bold text-white"
                      >
                        {data.sources
                          .filter(
                            // if similarty less than 0.75 remove
                            (source) => source[2] > 0.75
                          )
                          .map((source, index) => (
                            <div key={index} className="flex flex-col">
                              <div
                                className="flex justify-start cursor-pointer p-3 rounded-lg hover:bg-[#CEEC97] hover:text-black"
                                onClick={() =>
                                  setOpenedItemIndex(
                                    index === openedItemIndex ? -1 : index
                                  )
                                }
                              >
                                <div className="font-bold pr-3">
                                  {/* percentage with 3 */}
                                  {Math.round(source[2] * 1000) / 10}%
                                </div>
                                <div className="font-thin text-sm">
                                  {source[0]}
                                </div>
                              </div>
                              {index === openedItemIndex && (
                                <div className="bg-[#423E28] text-white p-3 rounded-lg text-sm mt-2 lg-max-w-[500px] lg:ml-10">
                                  {source[1]}
                                </div>
                              )}
                            </div>
                          ))}
                        {data.sources.filter(
                          // if similarty less than 0.75 remove
                          (source) => source[2] > 0.75
                        ).length === 0 && (
                          <div className="text-white text-center">
                            Şu ana kadar taradığımız kaynaklarda bununla ilgi
                            pek bişey bulamadık
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {error && (
                <div className="w-full flex justify-center items-center">
                  <div className="text-red-500 text-lg font-bold">
                    {error.message}
                  </div>
                </div>
              )}
              {loading && (
                <div className="w-full flex justify-center items-center">
                  <div
                    className={`font-bold text-white p-3 text-xl lg:text-3xl font-comfortaa bg-[#523E28] bg-opacity-90 rounded-lg flex flex-col items-center`}
                  >
                    {/* loading animation */}
                    <svg
                      className="animate-spin -ml-1 mr-3 h-20 w-20 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx={12}
                        cy={12}
                        r={10}
                        stroke="currentColor"
                        strokeWidth={4}
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                      />
                    </svg>
                    Sorunuz işleniyor...
                  </div>
                </div>
              )}
            </div>
            <div className="bottom-bar w-full">
              <div
                className={`flex items-center pt-3 px-5 pb-2 ${color} bg-gray-400 bg-opacity-50 rounded-t-lg w-full justify-between`}
              >
                <div className="links flex opacity-80">
                  <a href="https://twitter.com/mcagridurgut">
                    <img
                      className="hover:transform hover:scale-150  transition-all duration-300 ease-in-out"
                      src="/twitter.png"
                      alt="twitter"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/patreon.png"
                      alt="patreon"
                      className="ml-2 hover:transform hover:scale-150  transition-all duration-300 ease-in-out"
                    />
                  </a>
                  <a href="https://www.buymeacoffee.com/mcagri">
                    <img
                      src="/coffee.png"
                      alt="coffee"
                      className="ml-2 hover:transform hover:scale-150  transition-all duration-300 ease-in-out"
                    />
                  </a>
                  <a href="https://www.patreon.com/user?u=90947375">
                    <img
                      src="/email.png"
                      alt="mail"
                      className="ml-2 hover:transform hover:scale-150  transition-all duration-300 ease-in-out"
                    />
                  </a>
                  <a href="https://www.github.com/mcagridurgut">
                    <img
                      src="/github.png"
                      alt="github"
                      className="ml-2 hover:transform hover:scale-150  transition-all duration-300 ease-in-out"
                    />
                  </a>
                </div>

                {user ? (
                  // questions left
                  <div className="flex items-center">
                    <div className="text-white font-comfortaa lg:text-sm text-xs font-thin select-none drag-none">
                      {questionsLeft} soru hakkınız kaldı
                    </div>
                  </div>
                ) : (
                  <h1 className=" text-white font-comfortaa text-2xl font-thin select-none drag-none">
                    biyobot
                  </h1>
                )}
              </div>
            </div>
          </div>

          {!mobileMenu && (
            <div
              className={`${
                about || contact ? "block" : "hidden"
              } fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50`}
              onClick={() => {
                setAbout(false);
                setContact(false);
              }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div
                  className={`flex flex-col items-center justify-start ${color} lg:w-[50%] lg:h-[80%] w-[90%] h-[90%] rounded-2xl text-black p-3`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex justify-between items-center p-3 lg:mb-10 w-full">
                    <h1 className="lg:text-5xl text-3xl text-center font-comfortaa font-semibold pl-5">
                      {about ? "About" : "Contact"}
                    </h1>
                    {/* cross svg to close */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" h-10 w-10 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => {
                        setAbout(false);
                        setContact(false);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  {contact ? (
                    <>
                      {/* embed a simple iframe */}
                      {/* darken the iframe */}
                      <iframe
                        className="w-full"
                        style={{ filter: "brightness(0.8)" }}
                        width="100%"
                        height="80%"
                        src="https://form.jotform.com/230863799770977"
                        title="contact form"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </>
                  ) : (
                    <div className="p-5 font-comfortaa text-sm lg:text-xl overflow-y-auto">
                      <p className=" ">
                        Biyobot 9. sınıf biyoloji ders kitabı üzerinde semantik
                        arama yapmanızı sağlayan bir uygulama. Şu anda
                        deneyimsel bir aşamada, gelen feedbacklere göre diğer
                        ders kitaplarını eklemeyi ve app üzerinde ders kitabını
                        incelemek için bir tool eklemeyi düşünüyorum.
                      </p>
                      <p className="mt-4">
                        Kelime embeddingleri için ada-002, text generation için
                        gpt-3.5-turbo kullanılmakta. Her kullanıcının 10 soru
                        hakkı var, 10 soruyu doldurduysanız ve ekstra kredi
                        istiyorsanız form üzerinden bana ulaşabilirsiniz.
                      </p>
                      <p className=" mt-4">
                        Biyobotu şuanda yalnızca openAI{"'"}ın sağladığı 18$
                        {"'"}lık krediyle geliştiriyorum. İlginizi çektiyse
                        aşağıdaki linklerden destekte bulunabilirsiniz.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setContact(false);
              setAbout(false);
            }}
            className={`fixed top-0 left-0 h-full w-full transform transition-all duration-300 ease-in-out font-comfortaa text-black ${
              mobileMenu
                ? "bg-opacity-30 z-50 bg-black"
                : "bg-opacity-0  -z-10 "
              // mobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-[90%] mt-[10vh] ${color} bg-opacity-90 transform transition-all duration-300 ease-in-out rounded-r-2xl h-[90vh] ${
                mobileMenu ? "translate-x-0" : "-translate-x-full "
              }`}
            >
              <div className=" flex p-4 w-full h-full flex-col">
                <div className="flex justify-around items-center w-full p-3">
                  <div
                    onClick={() => {
                      setAbout(true);
                      setContact(false);
                    }}
                    className={`${
                      about ? "text-white" : "text-black"
                    } cursor-pointer`}
                  >
                    Hakkında
                  </div>

                  <div
                    onClick={() => {
                      setContact(true);
                      setAbout(false);
                    }}
                    className={`${
                      contact ? "text-white" : "text-black"
                    } cursor-pointer`}
                  >
                    İletişim
                  </div>
                </div>
                <div
                  className={`w-full p-4 h-full border-t-2 overflow-y-auto flex flex-col justify-between`}
                >
                  {contact ? (
                    <iframe
                      style={{ filter: "brightness(0.8)" }}
                      width="100%"
                      height="100%"
                      src="https://form.jotform.com/230863799770977"
                      title="contact form"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  ) : (
                    <>
                      <div className="p-5 font-comfortaa text-sm lg:text-xl">
                        <p className=" ">
                          Biyobot 9. sınıf biyoloji ders kitabı üzerinde
                          semantik arama yapmanızı sağlayan bir projedir. Şu
                          anda deneyimsel bir aşamada, gelen feedbacklere göre
                          geliştirmeyi düşünüyorum.
                        </p>
                        <p className="mt-4">
                          Kelime embeddingleri için ada-002, text generation
                          için gpt-3.5-turbo kullanılmakta. Her kullanıcının 10
                          soru hakkı var, 10 soruyu doldurduysanız ve ekstra
                          kredi istiyorsanız form üzerinden bana
                          ulaşabilirsiniz.
                        </p>
                        <p className=" mt-4">
                          Biyobotu şuanda yalnızca openAI{"'"}ın sağladığı 18$
                          {"'"}lık krediyle geliştiriyorum. Bu nedenle proje
                          ilginizi çektiyse destekte bulunabilirsiniz.
                        </p>
                      </div>
                    </>
                  )}
                  <button
                    className="p-3 bg-white rounded-md shadow-md font-comfortaa text-black w-full "
                    onClick={() => {
                      user ? logout() : googleLogin();
                    }}
                  >
                    {user ? "Çıkış Yap" : "Giriş Yap"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
