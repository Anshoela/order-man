package com.example.order_service.controller;

import com.example.order_service.model.Orders;
import com.example.order_service.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> placeOrder(
            @RequestPart("order") String orderJson,
            @RequestPart("file") MultipartFile file) {

        try {
            // Convert JSON string to Orders object
            ObjectMapper objectMapper = new ObjectMapper();
            Orders order = objectMapper.readValue(orderJson, Orders.class);

            // Generate UUID first
            UUID orderId = UUID.randomUUID();
            order.setOrderId(orderId);

            // Safe customer name for file
            String safeCustomerName = order.getCustomerName().replaceAll("[^a-zA-Z0-9]", "_");
            String fileName = safeCustomerName + "-" + order.getOrderId() + ".pdf";

            // Ensure upload directory exists
            String uploadDirPath = System.getProperty("user.dir") + "/uploads";
            File uploadDir = new File(uploadDirPath);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            // Save file
            File dest = new File(uploadDir, fileName);
            file.transferTo(dest);
            System.out.println("✅ File saved as: " + dest.getAbsolutePath());

            // Set order fields
            order.setInvoiceFileUrl("http://localhost:8080/uploads/" + fileName);
            order.setOrderDate(Instant.now());
            System.out.println("✅ Final Invoice URL: " + order.getInvoiceFileUrl());

            // Save to DB
            Orders saved = service.createOrders(order);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("❌ Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Orders>> getAll() {
        return ResponseEntity.ok(service.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getById(@PathVariable UUID id) {
        return service.getOrdersById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public String home() {
        return "Backend is running!";
    }
}


