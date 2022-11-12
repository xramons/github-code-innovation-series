console.log("Hola mundo");
const App = {
    data() {
      return {
        card: true,
        cardTitle: true,
        cardText: true,
        cardButton: true,
        cardImage: false,
        cardHeader: false,
        cardFooter: false,
        cardCenter: false,
        cardBorder: false,
        cardTextWhite: false,
        customColor: '',
      };
    },
    computed: {
      customStyle() {
        return {
          backgroundColor: this.customColor,
        };
      },
      cardTitleCreate() {
        if (this.cardTitle == true) {
          return '<h5 class="card-title">Card title</h5>';
        } else {
          return '';
        }
      },
      cardTextCreate() {
        if (this.cardText == true) {
          return `
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the
        card's content.
      </p>
      `;
        } else {
          return '';
        }
      },
      cardButtonCreate() {
        if (this.cardButton == true) {
          return '<button type="button" class="btn btn-primary">Button</button>';
        } else {
          return '';
        }
      },
      cardImageCreate() {
        if (this.cardImage == true) {
          return `
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img
          src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
          class="img-fluid"
        />
        <a href="#!">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
        </a>
      </div>
      `;
        } else {
          return '';
        }
      },
      cardHeaderCreate() {
        if (this.cardHeader == true) {
          return '<div class="card-header">Featured</div>';
        } else {
          return '';
        }
      },
      cardFooterCreate() {
        if (this.cardFooter == true) {
          return '<div class="card-footer">2 days ago</div>';
        } else {
          return '';
        }
      },
      customClass() {
        return [
          this.card ? 'card' : '',
          this.cardCenter ? 'text-center' : '',
          this.cardBorder ? 'border border-primary shadow-0' : '',
          this.cardTextWhite ? 'text-white' : '',
        ];
      },
      customColorCreate() {
        if (this.customColor != '') {
          return 'style="background-color:' + this.customColor + ';"';
        } else {
          return '';
        }
      },
    },
    methods: {
      reset: function (event) {
        this.cardTitle = true;
        this.cardText = true;
        this.cardButton = false;
        this.cardImage = false;
        this.cardHeader = false;
        this.cardFooter = false;
        this.cardCenter = false;
        this.cardBorder = false;
        this.cardTextWhite = false;
        this.customColor = '';
      },

      getHTMLCode() {
        return html_beautify(
          `
        <div class="${this.customClass.join(' ').replace('  ', ' ')}" ${this.customColorCreate}>${
            this.cardImageCreate
          }${this.cardHeaderCreate}
          <div class="card-body">${this.cardTitleCreate} ${this.cardTextCreate} 
            ${this.cardButtonCreate} 
          </div>${this.cardFooterCreate}
        </div>
        `,
          {
            indent_size: '2',
          }
        );
      },
      getSnippetElement() {
        return this.$refs.code.querySelector(`.language-${this.getActiveTab()} code`);
      },
      getActiveTab() {
        return this.$refs.code
          .querySelector('.docs-pills .nav-link.active')
          .textContent.toLowerCase();
      },
      handleTabChange() {
        const links = this.$refs.code.querySelectorAll('.docs-pills .nav-link');

        if (links.length > 1) {
          links.forEach((link) => {
            link.addEventListener('click', this.updatePrism, false);
          });
        }
      },
      updateCopyButton(code) {
        new ClipboardJS('.btn-copy-code', {
          text: () => {
            return code;
          },
        });
      },
      updatePrism() {
        const snippet = this.getSnippetElement();
        let activeCode = '';

        if (this.getActiveTab() === 'html') {
          activeCode = this.getHTMLCode();
        }

        snippet.textContent = activeCode;

        Prism.highlightAll();
        this.updateCopyButton(activeCode);
      },

      mounted() {
        setTimeout(() => {
          this.updatePrism();
          this.handleTabChange();
        }, 100);
      },
    },
    updated: function () {
      this.$nextTick(() => this.updatePrism());
    },
  };

  Vue.createApp(App).mount('#app');