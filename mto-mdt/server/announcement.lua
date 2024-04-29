RegisterNetEvent("nMDT:server-addAnnouncement", function(data)
    local player = QBCore.Functions.GetPlayer(source)
    if not player then print("oyuncu yok") return end

    local success = Database.InsertTableToCollection('announcements', {
        title = data.title,
        description = data.description,
        date = os.time(),
        writer = player.PlayerData.charinfo.firstname .. " " .. player.PlayerData.charinfo.lastname,
        id = QBCore.Shared.RandomStr(10) .. QBCore.Shared.RandomInt(5)
    })
    print(success)

    local announcements = Database.GetCollection('announcements')
    TriggerClientEvent("nMDT:client-SendMessage", -1, "setAnnouncements", announcements)

end)

RegisterNetEvent("nMDT:server-deleteAnnouncement", function(data)
    local player = QBCore.Functions.GetPlayer(source)
    if not player then print("oyuncu yok") return end

    Database.DeleteTableToCollection('announcements', {
       id = data 
    })

    local announcements = Database.GetCollection('announcements')
    TriggerClientEvent("nMDT:client-SendMessage", -1, "setAnnouncements", announcements)

end)