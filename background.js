var xhttp = new XMLHttpRequest();
var actived = true;

xhttp.onreadystatechange = function() {
	if (this.readyState==4 && this.status==200) {
		console.log(1)
		var xhtml = this.responseText
		let match = /<a href="\/conversations">\d+ <img src="\/img\/icones\/16\/enveloppe\.png" class="espace-2-2 img16" title="(\d+) nouveau\(x\) message\(s\)"><\/a>/.exec(xhtml)
		console.log(match)
		if (match!==null) {
			console.log(2)
			var notif = new Notification("Notifier801", {
				body: "Vous avez "+match[1]+" nouveau(x) message(s) !",
				icon: "http://societe.atelier801.com/images/logo.png",
			})
			notif.onclick = function(event) {
				event.preventDefault();
				let fen = window.open('http://atelier801.com/conversations');
				fen.focus();
				event.currentTarget.close();
			}
		}
	}
}

function checkMsg() {
	if (actived) {
		xhttp.open("GET", "http://atelier801.com/conversations");
		xhttp.send();
	}
}

checkMsg()
window.setInterval(checkMsg, 90000)
