(() => {
  "use strict";
  const n = document.createElement("template");
  (n.innerHTML =
    "\n<style>\n    \nh1, div, p {\nmargin: 0px;\npadding: 0px;\nfont-family: 'Roboto','sans serif';\n}\na{\ntext-decoration: none;\ncolor: inherit;\n}\n#github-logo{\nheight: 20px;\nposition: absolute;\ntop: 10px;\nright: 10px;\n}\n.cover{\nheight: 120px;\nwidth: 100%;\nbackground: #33ff00;\nposition: absolute;\nleft: 0px;\ntop: 0px;\nborder-top-left-radius: 5px;\nborder-top-right-radius: 5px;\n}\n\n.card {\nposition: relative;\ndisplay: inline-block;\nbackground: #ffffff;\nborder-radius: 5px;\nbox-shadow:  0 12px 13px rgba(0,0,0,0.16), 0 12px 13px rgba(0,0,0,0.16);\ntext-align: center;\npadding: 20px 30px;\npadding-top: 5px;\ntransition: all 0.5s;\n}\n\n/* Dark Theme */\n.card.dark{\nbackground: #1C1D21;\n}\n.dark .card-title{\ncolor: #E4E4E4 !important;\nfont-weight: 500 !important;\n}\n.dark .card-desc{\ncolor: #E4E4E4 !important;\nfont-weight: 500 !important;\n} \n.dark .count{\ncolor: #E4E4E4 !important;\nfont-weight: 600 !important;\n} \n.dark .box-text{\ncolor: #E4E4E4 !important;\nfont-weight: 500 !important;\n}\n.dark .footer-box{\nbackground: #1D2025 !important;\nbox-shadow: 0px 0.2px 5px rgba(255, 255, 255, 0.15), 0px 4px 10px rgba(0, 0, 0, 0.25) !important;\n}\n\n\n\n.card .fa-github {\nposition: absolute;\ncolor: #646464;\nfont-size: 20px;\ntop: 10px;\nright: 10px;\n}\n.card .card-title {\nfont-family: 'Baloo Paaji 2', cursive;\ncolor: #434343;\nmargin-bottom: -8px;\nfont-size: 30px;\nfont-weight: 600;\n}\n.card .card-responsename {\nmargin-bottom: 20px;\ncolor: #646464;\n}\n.card .card-desc {\nwidth: 250px;\nmargin: auto;\ndisplay: block;\nfont-weight: 600;\ncolor: #0000008a;\n}\n.card .card-img-wrapper {\nposition: relative;\nheight: 167px;\nwidth: 171.74px;\nmargin: 10px auto;\nmargin-bottom: 20px;\n}\n.card .card-img-wrapper img {\nheight: 100%;\nwidth: 100%;\nborder-radius: 50%;\n}\n.card .card-footer {\nmargin-top: 40px;\n}\n.card .card-footer .footer-box {\nposition: relative;\nbackground: #efefef;\nborder-top: 2px solid #7dfa5e;\nbox-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.26), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\nborder-radius: 5px;\nwidth: 300px;\nmargin: 0 auto;\npadding: 10px;\ndisplay: flex;\njustify-content: space-around;\n}\n.card .card-footer .footer-box .box-wrapper {\nposition: relative;\n}\n.card .card-footer .footer-box .box-wrapper .count {\nfont-family: 'Baloo Paaji 2', cursive;\ncolor: #434343;\nfont-size: 25px;\nfont-weight: 600;\n}\n.card .card-footer .footer-box .box-wrapper .box-text {\nfont-size: 12px;\nfont-weight: 600;\ncolor: #00000085;\nletter-spacing: 0.5px;\n}\n\n@media(max-width:400px){\n.card .card-footer .footer-box{\n    width: 100%;\n}\n}\n\n</style>\n<div class=\"card\"></div>\n"),
    customElements.define(
      "github-card",
      class extends HTMLElement {
        constructor() {
          super(),
            (this._shadowRoot = this.attachShadow({ mode: "open" })),
            this._shadowRoot.append(n.content.cloneNode(!0));
        }
        get observedAttribute() {
          return ["data-theme"];
        }
        attributeChangedCallback(n, t, o) {
          "data-theme" === n && t !== o && "" !== o && (this[n] = o);
        }
        connectedCallback() {
          if (
            (this.fontLoader(
              "https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400;600&family=Roboto&display=swap"
            ),
            this.fetchData(this.getAttribute("data-user")).then((n) => {
              const t = this.createCard(n);
              this._shadowRoot.querySelector(".card").innerHTML = t;
            }),
            this.getAttribute("data-theme"))
          ) {
            const n = this.getAttribute("data-theme");
            this.setTheme(n);
          }
        }
        setTheme(n) {
          switch (n) {
            case "dark":
              this._shadowRoot.querySelector(".card").classList.add("dark");
              break;
            default:
              this._shadowRoot.querySelector(".card").classList.remove("dark");
          }
        }
        async fetchData(n) {
          const t = await fetch(`https://api.github.com/users/${n}`, {
            method: "GET",
          });
          return await t.json();
        }
        fontLoader(n) {
          const t = document.createElement("link");
          t.setAttribute("type", "text/css"),
            t.setAttribute("rel", "stylesheet"),
            t.setAttribute("href", n),
            document.head.append(t);
        }
        createCard(n) {
          return `\n        <div class="cover"></div>\n        <div class="card-wrapper">\n        <a href="https://github.com/${n.login}" target="_blank" rel="noopener"><img id="github-logo" src="https://i.ibb.co/frv5pB3/github-logo.png" alt="github-logo" border="0"></a>\n        <div class="card-header">\n        <div class="card-img-wrapper"><img src="https://avatars.githubusercontent.com/${n.login}"/></div>\n        <h1><a class="card-title" href="${n.html_url}" target="_blank" rel="noopener">${n.name}</a></h1>\n        <div class="card-responsename"><a href="${n.html_url}" target="_blank" rel="noopener">@${n.login} 🎉</a></div>\n        <p class="card-desc">${n.bio}</p>\n        <div class="card-footer">\n        <div class="footer-box">\n            <div class="box-wrapper">\n                <div class="count">${n.followers}</div>\n                <div class="box-text">Followers</div>\n            </div>   \n            <div class="box-wrapper">\n                <div class="count">${n.following}</div>\n                <div class="box-text">Following</div>\n            </div>  \n            <div class="box-wrapper">\n                <div class="count">${n.public_repos}</div>\n                <div class="box-text">Repositories</div>\n            </div>\n        </div>\n        </div>\n        `;
        }
      }
    );
})();
