import React, { useContext, useState, createContext } from "react";
import htmlToImage from "html-to-image";
import download from "downloadjs";
const ChatContext = createContext("chat");

const BLUE = "#1982FF";

export default function ChatMaker() {
  const randoms = [
    "Connaissez-vous l'UPR ?",
    "Tu me manques bb.........",
    "JOSETTE CA VA MOI CA VA JESPERE QUE CA VA",
  ];

  const first = randoms[Math.floor(Math.random() * randoms.length)];

  const fakes = [
    {
      float: "left",
      children: first,
    },
    {
      float: "right",
      children: "Euh...",
    },
  ];

  const [messages, setMessages] = useState(fakes);
  const [src, setSrc] = useState(null);
  const [dest, setDest] = useState("roger");

  function add() {
    setMessages([...messages, { float: "left", children: "" }]);
  }

  function dwn() {
    htmlToImage.toPng(document.getElementById("chat")).then(function (dataUrl) {
      download(dataUrl, "my-node.png");
    });
  }

  function eraseImage() {
    setSrc(null);
  }

  function del(index) {
    let copy = [...messages].filter((_, i) => i !== index);
    setMessages(copy);
  }

  function change(i, e) {
    let copy = [...messages];
    copy[i][e.target.name] = e.target.value;
    setMessages(copy);
  }

  function onUpload(e) {
    let file = e.target.files[0];
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      setSrc(fr.result);
    });
    fr.readAsDataURL(file);
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        background: "#DDDDDD",
      }}
    >
      <ChatContext.Provider
        value={{
          change,
          messages,
          dest,
          setDest,
          add,
          del,
          dwn,
          src,
          onUpload,
          eraseImage,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            alt="me, an intellectual"
            style={{ width: "100px" }}
            src="/intellectual.png"
          />
          <ChatForm />
        </div>
        <ChatRendered />
      </ChatContext.Provider>
    </div>
  );
}

function ChatForm() {
  const {
    messages,
    change,
    dest,
    setDest,
    add,
    del,
    dwn,
    onUpload,
    eraseImage,
  } = useContext(ChatContext);

  return (
    <div
      style={{
        display: "flex",
        width: "300px",
        height: "300px",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div>
        <label>Destinataire</label>
        <input
          placeholder="roger"
          value={dest}
          onChange={(e) => setDest(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <label>Photo</label>
        <input onChange={onUpload} type="file" />
      </div>

      {messages.map((e, i) => (
        <div key={i} style={{ display: "flex" }}>
          <textarea
            value={e.children}
            name="children"
            onChange={(e) => change(i, e)}
          />
          <select name="float" onChange={(e) => change(i, e)}>
            <option value="left">Gauche</option>
            <option value="right">Droite</option>
          </select>
          <button onClick={() => del(i)}>delete</button>
        </div>
      ))}
      <button onClick={add}>add</button>
      <button onClick={eraseImage}>Erase Image</button>
      <button onClick={dwn}>Download</button>
    </div>
  );
}

function NetworkBall({ filled, size }) {
  return (
    <div
      style={{
        height: "" + size + "%",
        width: "5px",
        background: filled ? "black" : "",
        border: "solid 1px black",
        borderRadius: "4px",
      }}
    />
  );
}

function Layout({ children }) {
  return <div>{children}</div>;
}

function PieceOfLayout({ children }) {
  return <div>{children}</div>;
}

function BigLayout() {
  return (
    <Layout>
      <PieceOfLayout>toto</PieceOfLayout>
      <PieceOfLayout>toto</PieceOfLayout>
      <PieceOfLayout>toto</PieceOfLayout>
    </Layout>
  );
}

function MyApp() {
  return;
}

function Network() {
  return (
    <div
      style={{
        display: "flex",
        width: "22%",
        height: "60%",
        justifyContent: "space-evenly",
        transform: "scale(1,-1)",
      }}
    >
      <NetworkBall filled size={20} />
      <NetworkBall filled size={40} />
      <NetworkBall filled size={60} />
      <NetworkBall size={80} />
      <NetworkBall size={100} />
    </div>
  );
}

function ChatRendered() {
  const { messages, dest, src } = useContext(ChatContext);
  return (
    <div
      id="chat"
      style={{
        display: "flex",
        width: "600px",
        height: "600px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header
        style={{
          width: "100%",
          height: "20%",
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "space-evenly",
          background: "#F6F6F7",
          borderBottom: "0.1px solid rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "50%",
            width: "100%",
            justifyContent: "space-between",
            padding: "2%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              textAlign: "center",
              width: "20%",
              height: "100%",
            }}
          >
            <Network />
            QOQO
          </div>
          <div
            style={{
              fontWeight: "800",
              width: "20%",
              textAlign: "center",
            }}
          >
            12:23 PM
          </div>
          <div
            style={{
              width: "20%",
              //   textAlign: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            75%{"  "}
            <img
              src="/battery.png"
              alt="a battery"
              style={{ height: "100%" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            fontSize: "1.4rem",
            justifyContent: "space-between",
            padding: "2%",
            paddingTop: "0",
          }}
        >
          <div style={{ color: BLUE, width: "33%" }}> {"<"} 30 </div>
          <div
            style={{
              width: "33%",
              height: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                backgroundImage: !!src ? `url(${src})` : "",
                backgroundColor: !!src ? "" : "#929FA8",
                backgroundSize: "50px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: "white",
                alignItems: "center",
              }}
            >
              {!!dest && !src && dest[0].toUpperCase()}
            </div>
            {dest}
          </div>
          <div style={{ color: BLUE, width: "33%" }}></div>
        </div>
      </header>
      <main
        style={{
          width: "100%",
          height: "87.5%",
          display: "flex",
          flexDirection: "column",
          padding: "2%",
          background: "white",
        }}
      >
        {messages.map(({ float, children }, index) => (
          <div key={index} style={{ width: "100%", height: "auto" }}>
            <div
              style={{
                float,
                display: !!children ? "" : "none",
                background: float === "left" ? "#E5E5EA" : "#39A1F9",
                color: float === "left" ? "black" : "white",
                maxWidth: "60%",
                height: "auto",
                padding: "3%",
                paddingBottom: "1%",
                lineHeight: "26px",
                fontSize: "24px",
                borderRadius: "16px",
                margin: "2%",
                wordWrap: "break-word",
                width: "100%",
              }}
            >
              {children}
              <div
                style={{
                  width: "36px",
                  height: "12px",
                  position: "relative",
                  left: float === "left" ? "-26px" : "",
                  right: "-96.2%",
                  bottom: "-7.1px",
                  background: `url(/${float}.png) no-repeat`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
