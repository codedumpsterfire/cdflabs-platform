package com.cdfxlabs.backend.controllers;

import com.cdfxlabs.backend.models.entity.Listing;
import com.cdfxlabs.backend.services.ListingService;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/listings")
@Tag(name="Listings", description="xyz")
public class ListingsController {

    private final ListingService listingsService;

    public ListingsController(ListingService listingService ){
        this.listingsService = listingService;
    }

    @Operation(summary="Get all listings", description = "Returns all listings.")
    @GetMapping
    public List<Listing> getListings(){
        log.info("GET /api/listings invoked");
        return listingsService.getAllListings();
    }
}
