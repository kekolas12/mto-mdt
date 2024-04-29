QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("handleRecord", function(data, cb)
    TriggerServerEvent("nMDT:server-handleRecord", data)
end)

function sendRecords()
    QBCore.Functions.TriggerCallback("nMDT:server-getRecords", function(data)
        print(data)
        SendReactMessage("setRecords", data)
    end)
end

RegisterNetEvent("nMDT:client-updateRecords", function()
    sendRecords()
end)

RegisterNUICallback("getRecords", function(data, cb)
    sendRecords()
end)