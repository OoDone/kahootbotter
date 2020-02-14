const request = require('request');
class Search{
  constructor(query,config){
    this.config = {
      cursor: 0,
      limit: 100,
      query: query,
      order: "relevance",
      usage: [],
      type: [],
      language: [],
      questionLength: null,
      author: null,
      includeKahoot: true,
      includeCard: false,
      searchStrictly: false
    }
    const languages = {
      sq: "Albanian",
      asl: "American Sign Language",
      id: "Bahasa Indonesia",
      ca: "Català",
      cy: "Cymraeg",
      da: "Dansk",
      se: "Davvisámegiella",
      nl: "Deutsch",
      et: "Eesti keel",
      en: "English",
      es: "Español",
      eu: "Euskara",
      fr: "Français",
      ga: "Gaeilge",
      hr: "Hrvatski",
      it: "Italiano",
      jv: "Javanese",
      lv: "Latviešu valoda",
      lt: "Lietuvių kalba",
      la: "Lingua latīna",
      hu: "Magyar",
      ms: "Malay",
      mr: "Marathi",
      mi: "Māori",
      nld: "Nederlands",
      nb: "Norsk",
      pl: "Polski",
      pt: "Português",
      ro: "Român",
      sl: "Slovenščina",
      fi: "Suomi",
      sv: "Svenska",
      vi: "Tiếng Việt",
      tr: "Türk",
      is: "Íslenska",
      cs: "Čeština",
      haw: "ʻŌlelo Hawaiʻi",
      el: "ελληνικά",
      ru: "Русский язык",
      uk: "Українська мова",
      bg: "български език",
      srp: "српски",
      he: "עברית",
      ar: "العربية",
      fa: "فارسی",
      pa: "پنجابی",
      hi: "हिन्दी",
      bn: "বাংলা",
      ta: "தமிழ்",
      te: "తెలుగు",
      th: "ภาษาไทย",
      ka: "ქართული",
      zh: "中文",
      ja: "日本語",
      ko: "한국말"
    };
    for(let i in config){
      switch (i) {
        case "language":
          config[i].forEach(code=>{
            this.config.language.push(languages[code]);
          });
          break;
        default:
          this.config[i] = config[i];
      }
    }
  }
  search(f){
    var me = this;
    return new Promise((res,rej)=>{
      //create extra information.
      const data = `${me.config.author ? encodeURIComponent(" " + me.config.author) : ""}&cursor=${me.config.cursor}&limit=${me.config.limit}&orderBy=${me.config.order}&usage=${encodeURIComponent(this.config.usage.join(","))}&type=${encodeURIComponent(this.config.type.join(","))}&language=${encodeURIComponent(this.config.language.join(","))}${me.config.includeKahoot ? "&includeKahoot=" + true : ""}`;
      request(`https://create.kahoot.it/rest/kahoots?query=${encodeURIComponent(me.config.query)}${data}`,(e,r,b)=>{
        var response = JSON.parse(b).entities;
        try{
          response = response.filter(o=>{
            if(me.config.questionLength && me.config.questionLength != o.kahoot.questions.length){
              return false;
            }
            if(me.config.author && me.config.author != o.kahoot.creator_username){
              return false;
            }
            if(me.config.searchStrictly && me.config.query != o.kahoot.title){
              return false;
            }
            return true;
          });
        }catch(err){
          return res([]);
        }
        f ? (()=>{response = response.filter(f)})() : null;
        res(me.config.includeKahoot ? (
          me.config.includeCard ? (
            response
          ) : (
            (()=>{
              let a = [];
              response.forEach(o=>{
                a.push(o.kahoot);
              });
              return a;
            })()
          )
        ) : (
          response
        ));
      });
    });
  }
}
module.exports = Search;
