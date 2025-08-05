package com.example.order_service.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Orders {
    @Id
    private UUID orderId;

    private String customerName;
    private Double orderAmount;
    private Instant orderDate;

    private String invoiceFileUrl; 
}

