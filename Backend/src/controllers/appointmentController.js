const { appointments } = require("../models");

const getAllAppointments = async (req, res) => {
    try {
        const listOfAppointments = await appointments.findAll({
            where: { user_id: req.params.userId, isDeleted: false }
        });

        if (!listOfAppointments || !listOfAppointments.length) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Appointments Retrieved",
                success: true,
                appointments: listOfAppointments
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const getAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property, isDeleted: false }
        })

        if (!appointment) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Appointment Retrieved",
                success: true,
                appointment: appointment
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const addAppointment = async (req, res) => {
    try {
        await  appointments.create(req.body).then(() => {
            res.status(200).json({
                message: "Appointment Added",
                success: true
            })
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const updateAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property, isDeleted: false }
        })

        if (!appointment) {
            res.status(404).json({
                message: "Appointment not available",
                success: false
            })
        } else {
            const appointmentId = appointment.dataValues.appointment_id;
            await appointments.update(req.body, {
                where: { appointment_id: appointmentId }
            }).then( () => {
                res.status(200).json({
                    message: "Appointment Updated",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property, isDeleted: false }
        })

        if (!appointment) {
            res.status(404).json({
                message: "Appointment not available",
                success: false
            })
        } else {
            const appointmentId = appointment.dataValues.appointment_id;
            await appointments.update( { isDeleted: true }, {
                where: { appointment_id: appointmentId }
            }).then( () => {
                res.status(200).json({
                    message: "Appointment marked deleted",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

module.exports = { getAllAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment };