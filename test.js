const Canvas = require('canvas');
const Discord = require('discord.js');

    let level = 2;
    let xpObjectif = 60;
    let xp = 30;
    let xpBarre = (xpObjectif - xp) / xpObjectif * 490;

    const member = message.mentions.members.last() || message.member;

    const canvas = Canvas.createCanvas(800, 300);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/779452147326648360/803042845363011624/unknown.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    //Afficher du text
    ctx.font = '40px calibri';
    ctx.fillStyle = '#000000';
    ctx.fillText(`${member.user.tag}`, 225, 120);
    ctx.fillText(`Level : ${level}`, 630, 50)

    // Afficher la Barre blanche
    //Ouvrir une forme
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";
    //Tracé un point de départ à notre forme
    ctx.moveTo(220, 135);
    //Tracé des lignes à notre forme
    ctx.lineTo(690, 135);
    //Tracé des lignes arrondies a notre forme
    ctx.quadraticCurveTo(/*Abstraction*/ 710, 135, /*Arivée */ 710, 152.5);  
    ctx.quadraticCurveTo(/*Abstraction*/ 710, 170, /*Arivée */ 690, 170);
    ctx.lineTo(220, 170);
    ctx.lineTo(220, 135);
    //Remplir la forrme avec la couleur définie au dessus
    ctx.fill();
    //Fermer une forme
    ctx.closePath();

    // Barre rouge
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#ff5555";
    ctx.moveTo(220, 135);
    ctx.lineTo(220 + xpBarre-20, 135);
    ctx.quadraticCurveTo(/*Abstraction*/ 220 + xpBarre, 135, /*Arivée */ 220 + xpBarre, 152.5); 
    ctx.quadraticCurveTo(/*Abstraction*/ 220 + xpBarre, 170, /*Arivée */ 220 + xpBarre-20, 170); 
    ctx.lineTo(220, 170);
    ctx.lineTo(220, 135);
    ctx.fill();
    ctx.font = "30px calibri";
    ctx.fillStyle = "#000";
    ctx.fillText(`${xp} / ${xpObjectif} xp`, 230, 162)
    ctx.closePath();

    //Arc
    ctx.beginPath();
    //Trace un rond
    ctx.arc(125, 150, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    //dire que ce qui n'est pas dans le rond sera coupé ce qui donnera une pp arrondie
	ctx.clip();

    //Afficher la pp de member
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 50, 200, 200);

    //Assemblé l'image
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'https://cdn.discordapp.com/attachments/779452147326648360/803042845363011624/unknown.png');

    //Envoyé l'image
    message.channel.send(attachment);
