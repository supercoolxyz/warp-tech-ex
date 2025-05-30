// Exports the WindowService class as a singleton
// This service is used to open a new window with the given URL, name, and features.
// It is a singleton class, meaning that only one instance of the class can exist at a time.
// The class has a private constructor and a static method to get the instance of the class.
// The open method takes three parameters: url, name, and features.
export class WindowService {
  private static instance: WindowService;

  private constructor() {}

  public static getInstance(): WindowService {
    if (!WindowService.instance) {
      WindowService.instance = new WindowService();
    }
    return WindowService.instance;
  }

  // Opens a new window with the given URL, name, and features
  // url: The URL to open in the new window
  // name: The name of the new window
  // features: The features of the new window (optional)
  public open(url: string, name: string, features?: string): any {
    const child = window.open(url, name, features);
    if (child) {
        child.document.title = "Google";
        child.document.body.innerHTML = "<h1>Welcome to Google!</h1>";
        child.document.body.style.backgroundColor = "lightblue";
        child.document.body.style.textAlign = "center";
        child.document.body.style.fontFamily = "Arial, sans-serif";
        child.document.body.style.padding = "50px";
        child.document.body.style.fontSize = "24px";
    } else {
        console.error("Popup blocked or failed to open.");
    }

    return child;
  }
}
