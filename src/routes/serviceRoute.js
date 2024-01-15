const express = require("express");
const router = express.Router();
const jwt = require("../middlewares/jwt.js");

// const auth = require("../controllers/auth.js");

const serviceController = require("../controllers/serviceController.js");
router.route("/").get(serviceController.getAllServices).post(serviceController.createService)

router
  .route("/:id_service")

  .get(serviceController.getServiceById)
  .put(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;

// Swagger API
/**
 * @openapi
 * tags:
 *   name: Services
 *   description: CRUD operations for services
 */

/**
 * @openapi
 * /services:
 *   get:
 *     summary: Get all services
 *     description: Endpoint to retrieve all services.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /services/{id_service}:
 *   get:
 *     summary: Get service by ID
 *     description: Endpoint to retrieve a service by ID.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id_service
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new service
 *     description: Endpoint to create a new service.
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               employer:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - price
 *               - employer
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update service by ID
 *     description: Endpoint to update a service by ID.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id_service
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               employer:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - price
 *               - employer
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete service by ID
 *     description: Endpoint to delete a service by ID.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id_service
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
