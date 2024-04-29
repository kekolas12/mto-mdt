QBCore = exports['qb-core']:GetCoreObject()


RegisterNetEvent("nMDT:server-handleRecord", function(data)
    if data.id == "3" then
        data.id = QBCore.Shared.RandomStr(10) .. QBCore.Shared.RandomInt(5)
    end

    data.date = os.time()
    if Database.GetTableToCollection('records', {
        id = data.id
    })[1] then
        Database.UpdateTableToCollection("records", {id = data.id}, data)
    else
        Database.InsertTableToCollection('records', data)
    end

    local records = Database.GetCollection('records')
    TriggerClientEvent("nMDT:client-updateRecords", -1)
end)

QBCore.Functions.CreateCallback("nMDT:server-getRecords", function(source, cb, args)
    local records = Database.GetCollection('records')
    cb(records)
end)

RegisterNetEvent("nMDT-server:deleteReport", function(data)
    local player = QBCore.Functions.GetPlayer(source)
    if not player then print("oyuncu yok") return end

    Database.DeleteTableToCollection('records', {
       id = data.id
    })

    local records = Database.GetCollection('records')
    TriggerClientEvent("nMDT:client-updateRecords", -1)
end)