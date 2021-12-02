import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser,faPlus,faCompass,faComment } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faPlus);
  library.add(faCompass);
  library.add(faComment);
}

export default initFontAwesome;
