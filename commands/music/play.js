const { SlashCommandBuilder } = require("@discordjs/builders")
const { Interaction, VoiceChannel, Message, MessageEmbed } = require("discord.js");
const { createReadStream } = require('node:fs');
const { join } = require("path");
const voiceDiscord = require("@discordjs/voice")
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, SubscriptionStatus, StreamType } = require("@discordjs/voice")

module.exports.data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song from the Donda 2 album")
    .addStringOption(option =>
        option.setName('songs')
            .setDescription('The songs from Donda 2 album')
            .setRequired(true)
            .addChoice('Play All', 'play_all')
            .addChoice('Broken Road', 'broken_road')
            .addChoice('City of Gods', 'city')
            .addChoice('Eazy', 'eazy_song')
            .addChoice('First Time In a Long Time', 'first')
            .addChoice('Flowers', 'flowers')
            .addChoice('Get Lost', 'lost')
            .addChoice('Happy', 'happy')
            .addChoice('Lord Lift Me Up', 'lord')
            .addChoice('Louie Bags', 'louie')
            .addChoice('Pablo', 'pablo')
            .addChoice('Scifi', 'scifi')
            .addChoice('Security', 'security')
            .addChoice('Selfish', 'selfish')
            .addChoice('Too Easy', 'easy')
            .addChoice('True Love', 'true')
            .addChoice('We Did It Kid', 'kid'))
    .addChannelOption(option => option.setName('channel').setDescription("The channel the bot will join. This is not required if you are in a vc!"));


module.exports.run = async (client, interaction) => {


    // adding queue, skip, force skip, volume, nice embed also the directory where the song is coming from check line 94

    const channel = interaction.member.voice.channel || interaction.options.getChannel('channel')
    if (!channel) return interaction.editReply({ content: 'You are not connected to a voice channel!' })

    const connection = voiceDiscord.joinVoiceChannel({
        channelId: channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
    })

    const player = voiceDiscord.createAudioPlayer();

    player.on(voiceDiscord.AudioPlayerStatus.Playing, () => {
        console.log('Started playing')
    })

    player.on('error', error => {
        console.error(`Error: ${error.message}`)
    })

    if (interaction.options.getString('songs') === 'play_all') {
        // play all songs adding soon
        interaction.editReply({ content: 'Command coming soon!' })
    } else if (interaction.options.getString('songs') === 'broken_road') {
        songname = 'broken road.mp3'
    } else if (interaction.options.getString('songs') === 'city') {
        songname = 'cityofgods.mp3'
    } else if (interaction.options.getString('songs') === 'eazy_song') {
        songname = 'eazy.mp3'
    } else if (interaction.options.getString('songs') === 'first') {
        songname = 'longtime.mp3'
    } else if (interaction.options.getString('songs') === 'flowers') {
        songname = 'flowers.mp3'
    } else if (interaction.options.getString('songs') === 'lost') {
        songname = 'getlost.mp3'
    } else if (interaction.options.getString('songs') === 'happy') {
        songname = 'happy.mp3'
    } else if (interaction.options.getString('songs') === 'lord') {
        songname = 'lordlifemeup.mp3'
    } else if (interaction.options.getString('songs') === 'louie') {
        songname = 'louiebags.mp3'
    } else if (interaction.options.getString('songs') === 'pablo') {
        songname = 'pablo.mp3'
    } else if (interaction.options.getString('songs') === 'scifi') {
        songname = 'scifi.mp3'
    } else if (interaction.options.getString('songs') === 'security') {
        songname = 'security.mp3'
    } else if (interaction.options.getString('songs') === 'selfish') {
        songname = 'selfish.mp3'
    } else if (interaction.options.getString('songs') === 'easy') {
        songname = 'tooeasy.mp3'
    } else if (interaction.options.getString('songs') === 'true') {
        songname = 'True Love.mp3'
    } else if (interaction.options.getString('songs') === 'kid') {
        songname = 'wediditkid.mp3'
    }

    const resource = createAudioResource(`C:/Users/maxha/OneDrive/Skrivebord/dondadiscordmusic/songs/${songname}`, { inlineVolume: true });
    resource.volume.setVolume(0.5);

    player.play(resource)

    const name = interaction.user.username

    const pfp = interaction.member.displayAvatarURL()

    const songembed = new MessageEmbed()
        .setDescription('```Now Playing: \n song name here```') // Add song name with the background thingy ``` ```
        .setThumbnail('https://imbo.vgc.no/s/7ZDmnp4')
        .addFields(
            { name: 'Duration', value: `${Math.floor(resource.streamTime / 60000)}:${Math.floor((resource.streamTime % 60000)/1000) <10 ? '0'+Math.floor((resource.streamTime % 60000)/1000) : Math.floor((resource.streamTime % 60000)/1000)}  Duration: ${Math.floor(resource.duration/60)}:${resource.duration%60}` },
            { name: 'Volume', value: 'addding soon', inline: true },
            { name: 'Channel', value: `${channel}`, inline: true },
            { name: 'Loop', value: 'Some value here', inline: true },
            { name: 'Author', value: `${name.mention}`, inline: true },
        )
        .setFooter({ text: `Requested by ` + name, iconURL: pfp })

    interaction.editReply({
        embeds: [songembed],
        content: 'addding buttons like skip, volume, save song etc soon'
    })

    const subscription = connection.subscribe(player);

    // stops song after 5 sec
    // if (subscription) {
    //     setTimeout(() => subscription.unsubscribe(), 15_000);
    // }
}
