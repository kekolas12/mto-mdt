RegisterNUICallback("addAnnouncement", function(data)
    TriggerServerEvent("nMDT:server-addAnnouncement", data)
end)

RegisterNUICallback("deleteAnnouncment", function(id)
    TriggerServerEvent("nMDT:server-deleteAnnouncement", id)
end)