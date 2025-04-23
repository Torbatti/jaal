import { Switch, Match, createEffect, Accessor, Setter } from "solid-js"

import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";

import menuCogImg from "./assets/menu/cog.png"
import menuInfoImg from "./assets/menu/info.png"
import menuListImg from "./assets/menu/list.png"
import menuPlusImg from "./assets/menu/plus.png"

import Database from '@tauri-apps/plugin-sql';
// when using `"withGlobalTauri": true`, you may use
// const Database = window.__TAURI__.sql;

const db = await Database.load('sqlite:test.db');

import "./App.css";
import "./styles/main.css";
import "./styles/mobile.css";
import "./styles/desktop.css";

function Main() {
  const [appState, setAppState] = createSignal("1");
  const [appViewSection, setAppViewSection] = createSignal("1");

  const app: App ={
    section : [appViewSection,setAppViewSection],
  }

  createEffect(() => {
    switch (appState()) {
      case "1":

        break;
      case "2":

        break;
      default:
        console.log("ERROR: INVALID APP STATE")
        break;
    }
  });

  async function toggleAppState(state: string) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setAppState(await invoke("greet", { name: name() }));
    setAppState(state);
  }

  return (
    <main id="view">
      <AppViewMobile app={app}/>
      <AppViewDesktop app={app}/>
    </main>
  );
}

type App = {
  section:[accessor:Accessor<string>,setter:Setter<string>],
}

function AppViewMobile({ app }: { app: App }) {
  return(
    <div id="view-mobile">
      <div id="view-section-top">{app.section[0]()}</div>
      <div id="view-section-mid"></div>
      <div id="view-section-bot"></div>
    </div>
  )
}

function AppViewDesktop({ app }: { app: App }) {

  return (
    <div id="view-desktop">
      
      <div id="view-section-popover">

        <dialog id="popover-menuplus" class="popover" popover="auto">
          <p>menuplus</p>
          <button popovertarget="popover-menuplus" popovertargetaction="hide">x</button>
        </dialog>

        <dialog id="popover-menuinfo" class="popover" popover="auto">
          <p>menuinfo</p>
          <button popovertarget="popover-menuinfo" popovertargetaction="hide">x</button>
        </dialog>

      </div>

      <div id="view-section-left">
        
        <div id="view-section-left-top">
          <div class="vslt-jaal-text">Jaal</div>
          <div onclick={() => app.section[1]("1")}><img src={menuListImg} alt="s" /></div>
          <button popovertarget="popover-menuplus"><img src={menuPlusImg} alt="s" /></button>
        </div>

        <div id="view-section-left-bot">
          <div onclick={() => app.section[1]("2")}><img src={menuCogImg} alt="s" /></div>
          <button popovertarget="menuinfo"><img src={menuInfoImg} alt="s" /></button>
        </div>

      </div>

      <div id="view-section-mid">

      </div>

      <div id="view-section-right">

        <Switch>
          <Match when={app.section[0]() == "1"}>
            <p>Outcome 1</p>
          </Match>
          <Match when={app.section[0]() == "2"}>
            <p>Outcome 2</p>
          </Match>
        </Switch>

      </div>   

    </div>
  )
}


// <div class="side-bot">
  
// </div>
// </div>

// <div id="side">

// </div>

// <div id="view">
// 
// </div>

export default Main;
