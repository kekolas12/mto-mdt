RegisterNUICallback("addWanted",function(data, cb)
    TriggerServerEvent("nMDT-server:addWanted", data)
    -- local retval = QBCore.TriggerServerEvent("nMDT-server:addWanted", data)
end)

RegisterNUICallback("removeWanted",function(data, cb)
    TriggerServerEvent("nMDT-server:removeWanted", data)
    -- local retval = QBCore.TriggerServerEvent("nMDT-server:addWanted", data)
end)

RegisterNUICallback("addCarWanted", function(data, cb)
    TriggerServerEvent("nMDT-server:addCarWanted", data)
end)

RegisterNUICallback("deleteReport", function(data, cb)
    TriggerServerEvent("nMDT-server:deleteReport", data)
end)