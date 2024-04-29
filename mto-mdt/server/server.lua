QBCore = exports['qb-core']:GetCoreObject()

--[[
    Database.InsertTableToCollection('test', {
        malArda = true
    }, function(success)
        print(success)
    end)

    Database.DeleteTableToCollection('test', {
        malArda = true
    }, function(success)
        print(success)
    end)

    Database.UpdateTableToCollection('test', {
        malArda = true
    }, {
        malArda = false
    }, function(success)
        print(success)
    end)

    Database.GetTableToCollection('test', {
        malArda = true
    }, function(success, result)
        print(success, result)
    end)
    
]]

function query(query, options)
    local p = promise.new()

    MySQL.query(query, options, function(result)
        p:resolve(result)
    end)

    return Citizen.Await(p)
end

function getUsers()
    local users = query("SELECT * FROM players", {})

    local p = promise.new()
    local formattedUsers = {}

    for k,v in pairs(users) do
        local player = Database.GetTableToCollection('players', { citizenid = v.citizenid })[1]
        v.charinfo = json.decode(v.charinfo)
        v.job = json.decode(v.job)

        if not player then
            player = {
                licences = {},
                note = "",
                tags = {},
                record = 1,
                avatar = Config.Avatar,
                banner = Config.Banner
            }
        end

        table.insert(formattedUsers, {
            firstname = v.charinfo.firstname,
            lastname = v.charinfo.lastname,
            citizenid = v.citizenid,
            phoneNumber = v.charinfo.phone,
            job = v.job.name,
            gender = v.charinfo.gender,
            dateofbirth = v.charinfo.birthdate,
            record = player.record,
            tags = player.tags,
            licences = player.licences,
            note = player.note,
            avatar = player.avatar,
            banner = player.banner
        })
    end


    p:resolve(formattedUsers)

    return Citizen.Await(p)
end

function getCars() 
    local cars = query("SELECT * FROM player_vehicles")

    local p = promise.new()
    local formattedCars = {}


    -- ownerCitizenid: '1232112',
    -- plate: '98762',
    -- strike: 1,
    -- model: 'tofas',
    -- label: 'Tofaş',
    -- wanted: false,
    -- garage: 'C'


    for k,v in pairs(cars) do
        local data = Database.GetTableToCollection('cars', { plate = v.plate })[1]
        table.insert(formattedCars, {
            ownerCitizenid = v.citizenid,
            plate = v.plate,
            strike = v.strike_level,
            model = v.vehicle,
            label = QBCore.Shared.Vehicles[v.vehicle] and QBCore.Shared.Vehicles[v.vehicle].name or v.model,
            garage = v.garage or "A",
            wanted = data and data.wanted or false
        })
    end

    p:resolve(formattedCars)

    return Citizen.Await(p)
    
end




QBCore.Functions.CreateCallback("nMDT:server-prapereMDT", function(source, cb, args)
    local callbackData = {}

    callbackData.users = getUsers()
    callbackData.announcements = Database.GetCollection('announcements')
    callbackData.cars = getCars()

    cb(callbackData)
end)

RegisterNetEvent("nMDT:server-updateProfile", function(data)
    local oldData = Database.GetTableToCollection('players', { citizenid = data.citizenid })[1]

    if oldData then
        Database.UpdateTableToCollection("players", {citizenid = data.citizenid}, data)
    else
        Database.InsertTableToCollection('players', data)
    end

    local players = getUsers()
    TriggerClientEvent("nMDT:client-SendMessage", -1, "setUsers", players)
end)

exports('getPlayerLicences', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    
    return Database.GetTableToCollection('players', { citizenid = Player.PlayerData.citizenid })[1].licences
end)