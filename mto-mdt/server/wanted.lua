RegisterNetEvent("nMDT-server:addWanted", function(citizenid)
    local oldData = Database.GetTableToCollection('players', { citizenid = citizenid })[1]

    if oldData then
        oldData.record = 3
        Database.UpdateTableToCollection("players", {citizenid = citizenid}, oldData)
    else
        Database.InsertTableToCollection('players', {
            note = "",
            licences = {},
            citizenid = citizenid,
            tags = {},
            record = 3
        })
    end

    local players = getUsers()
    TriggerClientEvent("nMDT:client-SendMessage", -1, "setUsers", players)
end)

RegisterNetEvent("nMDT-server:removeWanted", function(citizenid)
    local oldData = Database.GetTableToCollection('players', { citizenid = citizenid })[1]

    if oldData then
        oldData.record = 2
        Database.UpdateTableToCollection("players", {citizenid = citizenid}, oldData)
    else
        Database.InsertTableToCollection('players', {
            note = "",
            licences = {},
            citizenid = citizenid,
            tags = {},
            record = 2
        })
    end

    local players = getUsers()
    TriggerClientEvent("nMDT:client-SendMessage", -1, "setUsers", players)
end)



RegisterNetEvent("nMDT-server:addCarWanted", function(plate)
    local oldData = Database.GetTableToCollection('cars', { plate = plate })[1]

    if oldData then
        oldData.wanted = not oldData.wanted
        Database.UpdateTableToCollection("cars", {plate = plate}, oldData)
    else
        Database.InsertTableToCollection('cars', {
            wanted = true,
            plate = plate
        })
    end

    local cars = getCars()
    TriggerClientEvent("nMDT:client-SendMessage", -1, "setCars", cars)
end)