(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();class f{constructor(){this.routes=[],this.currentRoute=null,this.notFoundHandler=null,this.base="/space-tourism-website/".replace(/\/$/,"")||""}addRoute(e,t){this.routes.push({pattern:this.pathToRegex(e),handler:t,path:e})}setNotFound(e){this.notFoundHandler=e}pathToRegex(e){const t=e.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^/]+)");return new RegExp(`^${t}$`)}extractParams(e,t){const s={},a=[],i=/:(\w+)/g;let o;for(;(o=i.exec(e))!==null;)a.push(o[1]);const l=this.pathToRegex(e),r=t.match(l);return r&&a.forEach((c,d)=>{s[c]=r[d+1]}),s}getCurrentPath(){let e=window.location.pathname;return this.base&&e.startsWith(this.base)&&(e=e.slice(this.base.length)),e.replace(/\/$/,"")||"/"}navigate(e){const t=this.getCurrentPath();if(e===t)return;const s=this.base+e;window.history.pushState({},"",s),this.handleRoute()}async handleRoute(){const e=this.getCurrentPath();for(const t of this.routes)if(e.match(t.pattern)){const a=this.extractParams(t.path,e);this.currentRoute={path:e,params:a},await t.handler(a);return}this.notFoundHandler&&(this.currentRoute={path:e,params:{}},await this.notFoundHandler())}init(){this.handleRoute(),window.addEventListener("popstate",()=>{this.handleRoute()}),document.addEventListener("click",e=>{const t=e.target.closest("a[href]");if(t&&t.href.startsWith(window.location.origin)){e.preventDefault();let s=new URL(t.href).pathname;this.base&&s.startsWith(this.base)&&(s=s.slice(this.base.length)),this.navigate(s)}})}getCurrentRoute(){return this.currentRoute}}const u=new f,w=[{name:"Moon",images:{png:"/src/assets/destination/image-moon.png",webp:"/src/assets/destination/image-moon.webp"},description:"See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",distance:"384,400 km",travel:"3 days"},{name:"Mars",images:{png:"/src/assets/destination/image-mars.png",webp:"/src/assets/destination/image-mars.webp"},description:"Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",distance:"225 mil. km",travel:"9 months"},{name:"Europa",images:{png:"/src/assets/destination/image-europa.png",webp:"/src/assets/destination/image-europa.webp"},description:"The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",distance:"628 mil. km",travel:"3 years"},{name:"Titan",images:{png:"/src/assets/destination/image-titan.png",webp:"/src/assets/destination/image-titan.webp"},description:"The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",distance:"1.6 bil. km",travel:"7 years"}],b=[{name:"Douglas Hurley",images:{png:"/src/assets/crew/image-douglas-hurley.png",webp:"/src/assets/crew/image-douglas-hurley.webp"},role:"Commander",bio:"Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2."},{name:"Mark Shuttleworth",images:{png:"/src/assets/crew/image-mark-shuttleworth.png",webp:"/src/assets/crew/image-mark-shuttleworth.webp"},role:"Mission Specialist",bio:"Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist."},{name:"Victor Glover",images:{png:"/src/assets/crew/image-victor-glover.png",webp:"/src/assets/crew/image-victor-glover.webp"},role:"Pilot",bio:"Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer."},{name:"Anousheh Ansari",images:{png:"/src/assets/crew/image-anousheh-ansari.png",webp:"/src/assets/crew/image-anousheh-ansari.webp"},role:"Flight Engineer",bio:"Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space."}],y=[{name:"Launch vehicle",images:{portrait:"/src/assets/technology/image-launch-vehicle-portrait.jpg",landscape:"/src/assets/technology/image-launch-vehicle-landscape.jpg"},description:"A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!"},{name:"Spaceport",images:{portrait:"/src/assets/technology/image-spaceport-portrait.jpg",landscape:"/src/assets/technology/image-spaceport-landscape.jpg"},description:"A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch."},{name:"Space capsule",images:{portrait:"/src/assets/technology/image-space-capsule-portrait.jpg",landscape:"/src/assets/technology/image-space-capsule-landscape.jpg"},description:"A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained."}],v={destinations:w,crew:b,technology:y};function p(n){const e="/space-tourism-website/",t=n.startsWith("/")?n.slice(1):n;return`${e.endsWith("/")?e.slice(0,-1):e}/${t}`}function L(n){const e=JSON.parse(JSON.stringify(n));return e.destinations&&(e.destinations=e.destinations.map(t=>({...t,images:{png:p(t.images.png),webp:p(t.images.webp)}}))),e.crew&&(e.crew=e.crew.map(t=>({...t,images:{png:p(t.images.png),webp:p(t.images.webp)}}))),e.technology&&(e.technology=e.technology.map(t=>({...t,images:{portrait:p(t.images.portrait),landscape:p(t.images.landscape)}}))),e}class A{constructor(){this.data=null,this.loaded=!1}async load(){if(this.loaded)return this.data;try{return this.data=L(v),this.loaded=!0,this.data}catch(e){throw console.error("Error loading data:",e),e}}getDestinations(){return this.data?.destinations||[]}getDestination(e){return this.getDestinations().find(t=>t.name.toLowerCase()===e.toLowerCase())}getCrew(){return this.data?.crew||[]}getCrewMember(e){return this.getCrew().find(t=>t.role.toLowerCase()===e.toLowerCase()||t.name.toLowerCase()===e.toLowerCase())}getTechnology(){return this.data?.technology||[]}getTechnologyItem(e){return this.getTechnology().find(t=>t.name.toLowerCase()===e.toLowerCase())}}const m=new A;function C(){const n=document.createElement("nav");n.setAttribute("aria-label","Primary navigation");const e=document.createElement("ul");return e.className="primary-navigation underline-indicators flex",e.id="primary-navigation",[{href:"/",label:"Home",number:"00"},{href:"/destination/moon",label:"Destination",number:"01"},{href:"/crew/commander",label:"Crew",number:"02"},{href:"/technology/launch-vehicle",label:"Technology",number:"03"}].forEach(s=>{const a=document.createElement("li"),i=document.createElement("a");i.href=s.href,i.innerHTML=`<span aria-hidden="true">${s.number}</span>${s.label}`,i.className="ff-sans-cond uppercase text-white letter-spacing-2",a.appendChild(i),e.appendChild(a)}),n.appendChild(e),n}function S(n){document.querySelectorAll(".primary-navigation li").forEach(t=>{const s=t.querySelector("a"),a=new URL(s.href).pathname;n===a||n.startsWith("/destination")&&a.startsWith("/destination")||n.startsWith("/crew")&&a.startsWith("/crew")||n.startsWith("/technology")&&a.startsWith("/technology")?(t.classList.add("active"),s.setAttribute("aria-selected","true")):(t.classList.remove("active"),s.removeAttribute("aria-selected"))})}function E(){const n=document.querySelector(".logo"),e=document.getElementById("primary-navigation");if(!n||!e)return;const t=()=>{const a=n.getBoundingClientRect(),o=e.getBoundingClientRect().left-a.left,l=Math.max(0,o*.75);e.style.setProperty("--nav-line-width",`${l}px`)};requestAnimationFrame(t);let s;window.addEventListener("resize",()=>{s&&cancelAnimationFrame(s),s=requestAnimationFrame(()=>{t(),s=null})})}function x(){const n=document.querySelector(".mobile-nav-toggle"),e=document.getElementById("primary-navigation"),t=n?.querySelector("span");if(!n||!e)return;const s=()=>{e.removeAttribute("data-visible"),n.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),t&&(t.setAttribute("aria-expanded","false"),t.textContent="Menu")},a=()=>{e.setAttribute("data-visible","true"),n.setAttribute("data-open","true"),n.setAttribute("aria-expanded","true"),t&&(t.setAttribute("aria-expanded","true"),t.textContent="Close")};n.addEventListener("click",()=>{e.hasAttribute("data-visible")?s():a()}),e.querySelectorAll("a").forEach(o=>{o.addEventListener("click",()=>{window.innerWidth<560&&s()})})}async function $(){const n=document.getElementById("main-content");n.className="grid-container grid-container--home",n.innerHTML=`
        <div>
          <h1 class="text-accent fs-500 ff-sans-cond uppercase letter-spacing-1">
            So, you want to travel to
            <span class="display-block fs-900 ff-serif text-white">Space</span>
          </h1>
          <p class="text-accent">
            Let's face it; if you want to go to space, you might as well genuinely go to 
            outer space and not hover kind of on the edge of it. Well sit back, and relax 
            because we'll give you a truly out of this world experience!
          </p>
        </div>
        <div>
          <a href="/destination/moon" class="large-button uppercase ff-serif text-dark bg-white">
            Explore
          </a>
        </div>
  `,document.title="Space Tourism | Home"}function k(n,e,t=0){const s=document.createElement("div");return s.className="tab-list underline-indicators flex",n.forEach((a,i)=>{const o=document.createElement("button");o.textContent=a.name,o.className="uppercase ff-sans-cond text-accent letter-spacing-2",o.style.backgroundColor="transparent",o.setAttribute("aria-selected",i===t),o.setAttribute("role","tab"),o.setAttribute("tabindex",i===t?"0":"-1"),o.addEventListener("click",()=>{e(i),M(s,i)}),s.appendChild(o)}),s}function M(n,e){n.querySelectorAll("button").forEach((s,a)=>{const i=a===e;s.setAttribute("aria-selected",i),s.setAttribute("tabindex",i?"0":"-1")})}async function N(n){const e=document.getElementById("main-content");e.className="grid-container grid-container--destination";const t=m.getDestinations();if(!t||t.length===0){e.innerHTML="<p>Loading destinations...</p>";return}let s=0;if(n&&n.name){const r=t.findIndex(c=>c.name.toLowerCase()===n.name.toLowerCase());r!==-1&&(s=r)}const a=t[s],i=k(t,r=>{const d=t[r].name.toLowerCase();u.navigate(`/destination/${d}`)},s);e.innerHTML=`
    <h1 class="numbered-title">
      <span aria-hidden="true">01</span>Pick your destination
    </h1>

    <picture class="destination-image">
      <source srcset="${a.images.webp}" type="image/webp">
      <img src="${a.images.png}" alt="Image of ${a.name} destination">
    </picture>

    <article class="destination-info flow">
      <h2 class="fs-800 uppercase ff-serif">${a.name}</h2>
      <p>${a.description}</p>
      <hr class="destination-divider">
      <div class="destination-meta flex">
        <div>
          <h3 class="text-accent fs-200 uppercase">Avg. distance</h3>
          <p class="ff-serif uppercase">${a.distance}</p>
        </div>
        <div>
          <h3 class="text-accent fs-200 uppercase">Est. travel time</h3>
          <p class="ff-serif uppercase">${a.travel}</p>
        </div>
      </div>
    </article>
  `;const o=e.querySelector(".destination-image"),l=document.createComment(" destination tab list navigation - dynamically inserted with event listeners ");o.after(l),l.after(i),document.title=`Space Tourism | Destination - ${a.name}`}function T(n,e,t=0){const s=document.createElement("div");s.className="dot-indicators flex";for(let a=0;a<n;a++){const i=document.createElement("button");i.setAttribute("aria-selected",a===t),i.setAttribute("aria-label",`Select item ${a+1}`),i.setAttribute("role","tab"),i.setAttribute("tabindex",a===t?"0":"-1"),i.addEventListener("click",()=>{e(a),I(s,a)}),s.appendChild(i)}return s}function I(n,e){n.querySelectorAll("button").forEach((s,a)=>{const i=a===e;s.setAttribute("aria-selected",i),s.setAttribute("tabindex",i?"0":"-1")})}async function R(n){const e=document.getElementById("main-content");e.className="grid-container grid-container--crew flow";const t=m.getCrew();if(!t||t.length===0){e.innerHTML="<p>Loading crew...</p>";return}let s=0;if(n&&n.role){const c={commander:"Commander",pilot:"Pilot",specialist:"Mission Specialist",engineer:"Flight Engineer"}[n.role.toLowerCase()]||n.role,d=t.findIndex(h=>h.role.toLowerCase()===c.toLowerCase());d!==-1&&(s=d)}const a=t[s],i=T(t.length,r=>{const c=t[r],h={Commander:"commander",Pilot:"pilot","Mission Specialist":"specialist","Flight Engineer":"engineer"}[c.role]||c.role.toLowerCase().replace(/\s+/g,"-");u.navigate(`/crew/${h}`)},s);e.innerHTML=`
    <h1 class="numbered-title">
      <span aria-hidden="true">02</span>Meet your crew
    </h1>

    <picture class="crew-image">
      <source srcset="${a.images.webp}" type="image/webp">
      <img src="${a.images.png}" alt="${a.name}">
    </picture>

    <article class="crew-details flow">
      <header>
        <h2 class="fs-600 ff-serif uppercase">
          ${a.role}
        </h2>
        <p class="fs-700 ff-serif uppercase">
          ${a.name}
        </p>
      </head>
      <p>${a.bio}</p>
    </article> 
  `;const o=e.querySelector(".crew-image"),l=document.createComment(" crew dot indicator navigation - dynamically inserted with event listeners ");o.after(l),l.after(i),document.title=`Space Tourism | Crew - ${a.name}`}function H(n,e,t=0){const s=document.createElement("div");s.className="numbered-indicators flex";for(let a=0;a<n;a++){const i=document.createElement("button");i.textContent=a+1,i.className="ff-serif",i.setAttribute("aria-selected",a===t),i.setAttribute("aria-label",`Select item ${a+1}`),i.setAttribute("role","tab"),i.setAttribute("tabindex",a===t?"0":"-1"),i.addEventListener("click",()=>{e(a),W(s,a)}),s.appendChild(i)}return s}function W(n,e){n.querySelectorAll("button").forEach((s,a)=>{const i=a===e;s.setAttribute("aria-selected",i),s.setAttribute("tabindex",i?"0":"-1")})}async function P(n){const e=document.getElementById("main-content");e.className="grid-container grid-container--technology flow";const t=m.getTechnology();if(!t||t.length===0){e.innerHTML="<p>Loading technology...</p>";return}let s=0;if(n&&n.name){const r={"launch-vehicle":"Launch vehicle",spaceport:"Spaceport","space-capsule":"Space capsule"}[n.name.toLowerCase()]||n.name,c=t.findIndex(d=>d.name.toLowerCase()===r.toLowerCase());c!==-1&&(s=c)}const a=t[s],i=H(t.length,l=>{const r=t[l],d={"Launch vehicle":"launch-vehicle",Spaceport:"spaceport","Space capsule":"space-capsule"}[r.name]||r.name.toLowerCase().replace(/\s+/g,"-");u.navigate(`/technology/${d}`)},s);e.innerHTML=`
    <h1 class="numbered-title">
      <span aria-hidden="true">03</span>Space launch 101
    </h1>

    <article class="technology-details flow">
      <header>
        <h2 class="fs-600 ff-sans-cond text-accent uppercase letter-spacing-3">
          The terminology...
        </h2>
        <p class="fs-700 uppercase ff-serif">${a.name}</p>
      </header>
      <p class="text-accent">${a.description}</p>
    </article>

    <div class="technology-image flex">
      <picture>
        <source srcset="${a.images.landscape}" media="(max-width: 768px)">
        <img src="${a.images.portrait}" alt="${a.name}">
      </picture>
    </div>
  `;const o=e.querySelector(".technology-details");e.insertBefore(i,o),document.title=`Space Tourism | Technology - ${a.name}`}async function D(){const n=document.getElementById("main-content");n.className="flow",n.innerHTML=`
    <h1 class="fs-700 ff-serif">404</h1>
    <p class="fs-500">Page not found</p>
    <a href="/" class="large-button uppercase ff-serif text-dark bg-white">
      Go Home
    </a>
  `,document.title="Space Tourism | Page Not Found"}function q(n){const e=document.body;e.classList.remove("home","destination","crew","technology","not-found"),n==="/"?e.classList.add("home"):n.startsWith("/destination")?e.classList.add("destination"):n.startsWith("/crew")?e.classList.add("crew"):n.startsWith("/technology")?e.classList.add("technology"):e.classList.add("not-found")}async function g(){try{await m.load()}catch(t){console.error("Failed to load data:",t),document.getElementById("main-content").innerHTML=`
      <main class="flow">
        <h1>Error loading data</h1>
        <p>Please refresh the page.</p>
      </main>
    `;return}const n=document.querySelector("header");if(n){const t=C();n.appendChild(t),x(),E()}const e=t=>async s=>{await t(s);const a=u.getCurrentRoute();a&&(q(a.path),S(a.path))};u.addRoute("/",e($)),u.addRoute("/destination/:name",e(N)),u.addRoute("/crew/:role",e(R)),u.addRoute("/technology/:name",e(P)),u.setNotFound(e(D)),u.init()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g();
