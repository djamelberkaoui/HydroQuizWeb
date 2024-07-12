mergeInto(LibraryManager.library, {
    ShowNotification: function(title, message) {
        // Konvertiere die UTF8-C-Strings zu JavaScript-Strings
        title = UTF8ToString(title);
        message = UTF8ToString(message);

        // Überprüfe, ob Benachrichtigungen unterstützt werden
        if (!("Notification" in window)) {
            console.log("Dieser Browser unterstützt keine Desktop-Benachrichtigungen.");
            return;
        }

        // Überprüfe, ob die Benachrichtigungserlaubnis bereits erteilt wurde
        if (Notification.permission === "granted") {
            // Erstelle die Benachrichtigung
            var notification = new Notification(title, { body: message });
        } else if (Notification.permission !== "denied") {
            // Frage den Benutzer um Erlaubnis
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    var notification = new Notification(title, { body: message });
                }
            });
        }
    }
});
