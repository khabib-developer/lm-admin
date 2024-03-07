import { Pages } from "../2.pages";
import { UiProvider } from "./provider/ui.provider";
import { AuthProvider } from "./provider/auth.provider";

function App() {
  return (
    <UiProvider>
      <AuthProvider>
        <Pages />
      </AuthProvider>
    </UiProvider>
  );
}

export default App;
