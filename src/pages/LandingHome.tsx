import React, { useState, useEffect, useMemo, useRef } from 'react';
import logoImg from '../assets/logo.jpg';
import treeGif from '../assets/treegif.gif';
import bgVideo from '../assets/background.mp4';
import '../LandingHome.css';


type CategoryKey = 'all' | 'vegetables' | 'fruits' | 'tubers' | 'grains_spices';

interface ProductItem {
  name: string;
  category: CategoryKey;
  categoryName: string;
  img: string;
  price: number;
  unit: string;
}


const ITEM_IMG: Record<string, string> = {
  carrots: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80",
  potatoes: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
  big_onions: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80",
  red_onions: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
  tomatoes: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  green_chillies: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=500&q=80",
  green_beans: "https://images.unsplash.com/photo-1558818498-28c1e002b655?auto=format&fit=crop&w=500&q=80",
  coconut: "https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=500&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  brinjal: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
  pumpkin: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=500&q=80",
  cabbage: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=500&q=80",
  leeks: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=500&q=80",
  beetroot: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=500&q=80",
  cucumber: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=500&q=80",
  bitter_gourd: "https://images.unsplash.com/photo-1628773822503-930a84d4bd28?auto=format&fit=crop&w=500&q=80",
  snake_gourd: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=500&q=80",
  sweet_corn: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80",
  okra: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=500&q=80",
  radish: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80",
  manioc: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=500&q=80",
  sweet_potatoes: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=500&q=80",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
  papaya: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=500&q=80",
  watermelon: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=500&q=80",
  grapes: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=500&q=80",
  guava: "https://images.unsplash.com/photo-1536511135898-132386cb691c?auto=format&fit=crop&w=500&q=80",
  ginger: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
  murunga: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=500&q=80",
  gotukola: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
};


const SRI_LANKA_DISTRICT_DATA: Record<string, ProductItem[]> = {
  colombo: [
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 390, unit: "kg" },
    { name: "Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.potatoes, price: 460, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 340, unit: "kg" },
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 480, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 280, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 740, unit: "kg" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 420, unit: "kg" },
    { name: "Fresh Coconut", category: "grains_spices", categoryName: "Produce", img: ITEM_IMG.coconut, price: 140, unit: "nut" },
    { name: "Keeri Samba Rice", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.rice, price: 240, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 260, unit: "kg" },
    { name: "Ambul Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 230, unit: "kg" },
    { name: "Red Lady Papaya", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.papaya, price: 210, unit: "kg" }
  ],
  gampaha: [
    { name: "Fresh Coconut", category: "grains_spices", categoryName: "Produce", img: ITEM_IMG.coconut, price: 130, unit: "nut" },
    { name: "Ambul Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 220, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 270, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 335, unit: "kg" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 410, unit: "kg" },
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 380, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 160, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 720, unit: "kg" },
    { name: "Crisp Cucumber", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.cucumber, price: 170, unit: "kg" }
  ],
  kalutara: [
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 150, unit: "kg" },
    { name: "Sweet Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.sweet_potatoes, price: 190, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 340, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 275, unit: "kg" },
    { name: "Snake Gourd", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.snake_gourd, price: 230, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 730, unit: "kg" },
    { name: "Ambul Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 210, unit: "kg" },
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 385, unit: "kg" }
  ],
  kandy: [
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 380, unit: "kg" },
    { name: "Upcountry Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.potatoes, price: 430, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 250, unit: "kg" },
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 350, unit: "kg" },
    { name: "White Radish", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.radish, price: 180, unit: "kg" },
    { name: "Gotukola Greens", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.gotukola, price: 120, unit: "bunch" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 230, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 690, unit: "kg" }
  ],
  matale: [
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 310, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 230, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 670, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 150, unit: "kg" },
    { name: "Bitter Gourd", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.bitter_gourd, price: 290, unit: "kg" },
    { name: "Snake Gourd", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.snake_gourd, price: 210, unit: "kg" },
    { name: "Sweet Corn", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.sweet_corn, price: 170, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 220, unit: "kg" }
  ],
  nuwaraeliya: [
    { name: "Upcountry Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 320, unit: "kg" },
    { name: "Nuwara Eliya Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.potatoes, price: 390, unit: "kg" },
    { name: "Tender Leeks", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.leeks, price: 240, unit: "kg" },
    { name: "Green Cabbage", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.cabbage, price: 170, unit: "kg" },
    { name: "Red Beetroot", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.beetroot, price: 290, unit: "kg" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 360, unit: "kg" },
    { name: "White Radish", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.radish, price: 160, unit: "kg" }
  ],
  galle: [
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 380, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 260, unit: "kg" },
    { name: "Sweet Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.sweet_potatoes, price: 195, unit: "kg" },
    { name: "Snake Gourd", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.snake_gourd, price: 220, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 340, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 710, unit: "kg" },
    { name: "Red Lady Papaya", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.papaya, price: 190, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 160, unit: "kg" }
  ],
  matara: [
    { name: "Sweet Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.sweet_potatoes, price: 185, unit: "kg" },
    { name: "Snake Gourd", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.snake_gourd, price: 215, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 160, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 255, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 335, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 700, unit: "kg" },
    { name: "Ambul Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 200, unit: "kg" },
    { name: "Crisp Cucumber", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.cucumber, price: 165, unit: "kg" }
  ],
  hambantota: [
    { name: "Fresh Watermelon", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.watermelon, price: 140, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 140, unit: "kg" },
    { name: "Red Lady Papaya", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.papaya, price: 180, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 680, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 250, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 330, unit: "kg" },
    { name: "Sweet Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.sweet_potatoes, price: 180, unit: "kg" },
    { name: "Fresh Okra", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.okra, price: 210, unit: "kg" }
  ],
  jaffna: [
    { name: "Jaffna Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 440, unit: "kg" },
    { name: "Northern Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 680, unit: "kg" },
    { name: "Drumsticks (Murunga)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.murunga, price: 360, unit: "kg" },
    { name: "Northern Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 170, unit: "kg" },
    { name: "Jaffna Grapes", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.grapes, price: 850, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 270, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 220, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 160, unit: "kg" }
  ],
  kilinochchi: [
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 450, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 670, unit: "kg" },
    { name: "Drumsticks (Murunga)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.murunga, price: 350, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 150, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 165, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 335, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 265, unit: "kg" },
    { name: "Fresh Okra", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.okra, price: 200, unit: "kg" }
  ],
  mannar: [
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 460, unit: "kg" },
    { name: "Fresh Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 690, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 270, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 340, unit: "kg" },
    { name: "Drumsticks (Murunga)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.murunga, price: 370, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 225, unit: "kg" },
    { name: "Sweet Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.sweet_potatoes, price: 180, unit: "kg" }
  ],
  vavuniya: [
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 330, unit: "kg" },
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 460, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 675, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 145, unit: "kg" },
    { name: "Samba Rice", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.rice, price: 220, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 250, unit: "kg" },
    { name: "Sweet Corn", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.sweet_corn, price: 170, unit: "kg" }
  ],
  mullaitivu: [
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 455, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 680, unit: "kg" },
    { name: "Drumsticks (Murunga)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.murunga, price: 360, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 160, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 270, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 150, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 215, unit: "kg" }
  ],
  batticaloa: [
    { name: "Eastern Samba Rice", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.rice, price: 220, unit: "kg" },
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 465, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 210, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 690, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 260, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 170, unit: "kg" },
    { name: "Sweet Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.sweet_potatoes, price: 185, unit: "kg" }
  ],
  ampara: [
    { name: "Samba Rice", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.rice, price: 215, unit: "kg" },
    { name: "Sweet Corn", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.sweet_corn, price: 160, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 140, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 250, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 680, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 330, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 205, unit: "kg" }
  ],
  trincomalee: [
    { name: "Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 460, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 265, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 695, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 145, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 335, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 220, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 170, unit: "kg" }
  ],
  kurunegala: [
    { name: "Fresh Coconut", category: "grains_spices", categoryName: "Produce", img: ITEM_IMG.coconut, price: 125, unit: "nut" },
    { name: "Ambul Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 200, unit: "kg" },
    { name: "Red Lady Papaya", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.papaya, price: 190, unit: "kg" },
    { name: "Crisp Cucumber", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.cucumber, price: 160, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 325, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 245, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 680, unit: "kg" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 390, unit: "kg" }
  ],
  puttalam: [
    { name: "Kalpitiya Red Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.red_onions, price: 445, unit: "kg" },
    { name: "Red Beetroot", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.beetroot, price: 300, unit: "kg" },
    { name: "Fresh Guava", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.guava, price: 250, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 250, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 670, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 325, unit: "kg" },
    { name: "White Radish", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.radish, price: 170, unit: "kg" }
  ],
  anuradhapura: [
    { name: "Keeri Samba Rice", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.rice, price: 225, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 135, unit: "kg" },
    { name: "Sweet Corn", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.sweet_corn, price: 165, unit: "kg" },
    { name: "Fresh Okra", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.okra, price: 205, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 325, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 240, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 670, unit: "kg" },
    { name: "Eggplants (Brinjal)", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.brinjal, price: 210, unit: "kg" }
  ],
  polonnaruwa: [
    { name: "Nadu & Samba Rice", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.rice, price: 220, unit: "kg" },
    { name: "Sweet Corn", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.sweet_corn, price: 160, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 135, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 675, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 245, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 325, unit: "kg" },
    { name: "Fresh Okra", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.okra, price: 200, unit: "kg" }
  ],
  badulla: [
    { name: "Keppetipola Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 330, unit: "kg" },
    { name: "Tender Leeks", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.leeks, price: 250, unit: "kg" },
    { name: "Green Cabbage", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.cabbage, price: 175, unit: "kg" },
    { name: "Red Potatoes", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.potatoes, price: 410, unit: "kg" },
    { name: "Red Beetroot", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.beetroot, price: 300, unit: "kg" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 380, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 240, unit: "kg" }
  ],
  monaragala: [
    { name: "Sweet Corn", category: "grains_spices", categoryName: "Grains", img: ITEM_IMG.sweet_corn, price: 160, unit: "kg" },
    { name: "Red Lady Papaya", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.papaya, price: 175, unit: "kg" },
    { name: "Fresh Watermelon", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.watermelon, price: 145, unit: "kg" },
    { name: "Sweet Pumpkin", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.pumpkin, price: 135, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 155, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 250, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 680, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 330, unit: "kg" }
  ],
  ratnapura: [
    { name: "Kolikuttu Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 310, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 160, unit: "kg" },
    { name: "Raw Ginger", category: "grains_spices", categoryName: "Spices", img: ITEM_IMG.ginger, price: 860, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 260, unit: "kg" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 400, unit: "kg" },
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 370, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 335, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 710, unit: "kg" }
  ],
  kegalle: [
    { name: "Ambul Bananas", category: "fruits", categoryName: "Fruit", img: ITEM_IMG.banana, price: 210, unit: "kg" },
    { name: "Fresh Manioc", category: "tubers", categoryName: "Tubers", img: ITEM_IMG.manioc, price: 155, unit: "kg" },
    { name: "Fresh Coconut", category: "grains_spices", categoryName: "Produce", img: ITEM_IMG.coconut, price: 130, unit: "nut" },
    { name: "Green Beans", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_beans, price: 395, unit: "kg" },
    { name: "Ripe Tomatoes", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.tomatoes, price: 255, unit: "kg" },
    { name: "Fresh Carrots", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.carrots, price: 370, unit: "kg" },
    { name: "Big Onions", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.big_onions, price: 330, unit: "kg" },
    { name: "Green Chillies", category: "vegetables", categoryName: "Vegetable", img: ITEM_IMG.green_chillies, price: 700, unit: "kg" }
  ]
};

const DISTRICT_DISPLAY_NAMES: Record<string, string> = {
  colombo: "Colombo District",
  gampaha: "Gampaha District",
  kalutara: "Kalutara District",
  kandy: "Kandy District",
  matale: "Matale District",
  nuwaraeliya: "Nuwara Eliya District",
  galle: "Galle District",
  matara: "Matara District",
  hambantota: "Hambantota District",
  jaffna: "Jaffna District",
  kilinochchi: "Kilinochchi District",
  mannar: "Mannar District",
  vavuniya: "Vavuniya District",
  mullaitivu: "Mullaitivu District",
  batticaloa: "Batticaloa District",
  ampara: "Ampara District",
  trincomalee: "Trincomalee District",
  kurunegala: "Kurunegala District",
  puttalam: "Puttalam District",
  anuradhapura: "Anuradhapura District",
  polonnaruwa: "Polonnaruwa District",
  badulla: "Badulla District",
  monaragala: "Monaragala District",
  ratnapura: "Ratnapura District",
  kegalle: "Kegalle District"
};

const DISTRICT_LIST = Object.keys(DISTRICT_DISPLAY_NAMES);


export const AgriSmartApp: React.FC = () => {
  const [introVisible, setIntroVisible] = useState<boolean>(true);
  const [introFading, setIntroFading] = useState<boolean>(false);
  const [appReady, setAppReady] = useState<boolean>(false);

  const [currentDistrict, setCurrentDistrict] = useState<string>("colombo");
  const [currentCategory, setCurrentCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pricesSectionRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFading(true);
      setAppReady(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      setTimeout(() => {
        setIntroVisible(false);
      }, 700);
    }, 6800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToPrices = () => {
    pricesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  const currentDistrictProducts = useMemo(() => {
    return SRI_LANKA_DISTRICT_DATA[currentDistrict] || SRI_LANKA_DISTRICT_DATA.colombo;
  }, [currentDistrict]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return currentDistrictProducts.filter((p) => {
      const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [currentDistrictProducts, currentCategory, searchQuery]);

  return (
    <div className="agri-smart-root">
   

    
      {introVisible && (
        <div id="introScreen" className={introFading ? 'fade-out' : ''}>
          <div className="intro-box">
            <div className="tree-gif-box">
              <img
                src={treeGif}
                alt="Agri SMART Growth"
                className="tree-gif-img"
                onError={(e) => {
                  e.currentTarget.src = '/treegif.gif';
                }}
              />
              <div className="tree-glow-aura" />
            </div>
            <div className="intro-title">
              Agri <span>SMART</span>
            </div>
            <div className="intro-slogan">From Farm to Market, Smarter.</div>
            <div className="intro-loader-line">
              <div className="intro-loader-fill" />
            </div>
          </div>
        </div>
      )}

  
      <div id="mainApp" className={appReady ? 'is-ready' : ''}>
        {/* Background Atmosphere */}
        <div className="bg-container">
          <video
            ref={videoRef}
            className="bg-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={bgVideo} type="video/mp4" />
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay" />
        </div>

        <div className="grid-overlay" />

      
        <nav>
          <a href="#" className="logo" onClick={scrollToTop}>
            <img
              src={logoImg}
              alt="Agri SMART Logo"
              className="logo-img"
              onError={(e) => {
                e.currentTarget.src = '/logo.jpg';
              }}
            />
            Agri <span>SMART</span>
          </a>

          <div className="nav-right">
            <a href="http://localhost:5173/join-us" className="team-btn">
              Join Our Team
            </a>
          </div>
        </nav>

       
        <main>
          <section className="hero">
            

            <h1>
              From
              <br />
              Farm to Market,
              <br />
              Smarter.
            </h1>

            <p className="sub">
              An unwavering commitment to maintaining a high-quality food supply chain.
            </p>

            <div className="metrics">
              <div
                className="metric"
                onClick={scrollToPrices}
                title="Click to explore Sri Lanka district market prices"
              >
                <strong>100+</strong>
                <small>Town Markets</small>
              </div>

              <div className="metric" onClick={scrollToPrices}>
                <strong>DAILY</strong>
                <small>Market Prices</small>
              </div>

              <div className="metric">
                <strong>100%</strong>
                <small>Fresh Produce</small>
              </div>
            </div>
          </section>
        </main>

       
        <section
          className="section-prices"
          id="pricesSection"
          ref={pricesSectionRef}
        >
          <div className="price-container">
            <div className="price-header">
              <div className="price-header-text">
               
                <h2>
                  <span>Sri Lanka</span> District Wholesale Prices
                </h2>
                <p>
                  Select any of the 25 districts or click directly on the interactive map to view real-time grocery prices.
                </p>
              </div>

              <div className="price-header-stats">
               
               
              </div>
            </div>

            <div className="dashboard-layout">
              
              <div className="map-column">
                <div className="map-column-title">
                  
                </div>

                <svg
                  className="sl-svg-map"
                  viewBox="200 30 580 940"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="slDistricts">
                    {/* Jaffna */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'jaffna' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('jaffna')}
                      aria-label="Jaffna"
                      d="M466.1 133.1l-1.4 1.2-1.2 0.8-15.7-10.8-5.4-2.5-4.8-1.1-0.7-0.3-0.7-0.3-4.1-3.2-1.6-0.9-1.6-0.3-1.9 0.1-0.4-2.3-3-9 0.6 0.3 0-1.8-8.4-4.2-20.3-16.7-16.6-19.2-8.4-4.6-13.2-3.1-3.5-2.5-0.5-3.6 4.9-2.1 1.5-0.3 4.8-0.8 9.6-0.4 4.6 0.8 3.2 2.3 2.1 7.6 2.1 3.2 30.2 35.7 4.4 3.2 9 5.2 36.4 29.6z m-85.3-37.6l-11.8-5.2-4.3-2.5-2.9 0 0.6 5.7 1.6 1.6 2.4 1.9 1.5 2.3-1.5 3-1.7 0.6-1.7-1-1.5-1.3-4.5-2.3-8.6-7.5-4.9-2.1 2.5 2.8 4.5 3.9 2.6 2.8-5.6-1-5.5-2.3-11.1-6.2-8.9-7-5.2-1.9-0.5-0.3-2-1.3-1.9-0.8-0.3 1.7-2.5-1.7-1-2.3-0.4-2.7-0.9-3-1.5-2.6-0.9-1.2-2.4-3.1-1.5-2.7 5-2.5 9.1-8.5 4-1.8 0.1 0 18 1.6 9.4-1.1 3.4 0.4 1.4 3.2-0.3 4.9 0.7 1.7 2 0.6 1.9 0.3 5.5 1.4 1.2 0.7 1 2 2.5-0.1 1.9-0.6 0.8-0.2 1.1-0.2 0.8-0.1 1.8 1.1 0.8 0.4 6.4 7.1 9.3 10.1 0 0.1-3.1 6.7-4.9 8.5z m-121 27l-1.9 1.7-1.9 1.8-5.8 0.4-5.4-1.8-2.3-3 0-9.6 0.6-2.4 1.6 0.3 1.5 2 1 2.4 4 1.3 4.7 0.4 1.2 0.8 2.7 5.7z m38-27.4l-3.6-2.6-3.5-5.4-5.6-11.2 2.5-4 0.6-5.1 1.5-4.2 5-1.1 2.6 0.8 0.1 0 0.2 2-0.9 2.8-0.6 3.1 0.1 3.2 0.3 2.6 0 0.2 0.2 0.5 0.8 1.8 1.1 1.2 0.8 1 1 0.2 4.5-0.2 0.7 0.7 0.3 3.5 0.6 1.4 2.6 1.7 3.6 1.5 3 1.7 0.2 0.6 0.8 1.7-1.6 1.6-3 0-3.3-1-2.3-1.4-1.6-0.4-4.2 2.4-2.9 0.4z"
                    >
                      <title>Jaffna</title>
                    </path>
                    {/* Kilinochchi */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'kilinochchi' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('kilinochchi')}
                      aria-label="Kilinochchi"
                      d="M423.6 104.5l3 9 0.4 2.3-2.8 0.2-1.8 0.7-0.3 0.4-0.5 0.8-0.9 0.5-3.1-2.3-1.2-0.2-7.5 0.2-2.1-0.6-16.4-14.3-7-4.6-0.1 0-2.5-1.1 4.9-8.5 3.1-6.7 0-0.1 11 12.1 7.2 4.5 16.6 7.7z m39.9 30.6l-1.1 1.1-0.5 3.9-4.9 3.9-0.7 5.3 0.6 5.3-5.2-2.9-4.6-3.8-1.7-2.2-1.1 0.3-3.2 10.6-3.9 2.1-5.8 0.4-10.5-0.6-3.1 0.1-4 10.1-6.1 0.6-6.2-1.1-6.3 0.1-17.7 2-6 7.9 0.6 6.5-6.1-0.8-4.4 3.3-4.9 2.5-7.9 0.7-1.7 0 1.4-5.7 0-13.6 0.5-2-0.4-1.3-2.7-0.5-6.4-3.3-2.4-2.4-1.6-4.4-0.3-0.8-1.1-5.4-0.1-3.1 2.8-3 5.1-2.5 5.6-1.8 4.7-0.7 2.1-1.1 5-6.7 0.6-0.5 0.9-0.7 1.7-1 2.1-0.8 2.6-0.4-2.2-4-1.3-1.8-1.3-1.8-3.4-3.4-4.5-3.4-17-10-3.5-4.3 7.4 0.2 7.1 2.9 13.9 8.1 13.2 3.3 3.5 2.3 5.5 4.8 1.3 2.5-2.8 1.4 0.6 1.6 0.8 1.6-1.4 1.6 4.8 3.3 11.4-2.8 20.8-8.3 5.7 0.5 12.2 3.4 14.5 6.6 11 2.1z"
                    >
                      <title>Kilinochchi</title>
                    </path>
                    {/* Mullaitivu */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'mullaitivu' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('mullaitivu')}
                      aria-label="Mullaitivu"
                      d="M534.5 241.9l-3.6 1.6-4.4 1.3-4 2.3-4.5 1.3-10.6 1.4-9.1 4.2 4.3-15.8-2.8-3.7-7.4-4.5-7.2-1.1-3.4 2.3-3.6 0.9 0.4-3.2 2.2-3.3-2.7-4.7-6.2-0.7-0.8-7.5-7.2-2.7-7.5 0.2-0.5 1.1-0.4 1.2-2.2 1.3-2.3 1.1-4 3.5-5.6 2.5-3.6-5.3-5.7-3.6-8 0.2-4.4-0.3-4.2 0.4-0.6 3.4 1.8 2.5 3.4 0.5 0.2 1.9 0 2.1 0.9 4 0.2 3.9-4.1 6.3-6.4 5.2-10.7 6.8-38.1 2 3-8.4-1.1-1.6-1.1-2.1 0.8-2.7 1.2-2.6 0.8-2.6 1-2.3 5.1-1.7 0.3-4.8-0.5-5.5 0.9-3.4 0.1-3.5-0.2-1.8-0.5-1.6-4.2-6.8-1.4-7.6-0.3-8 6.1 0.8-0.6-6.5 6-7.9 17.7-2 6.3-0.1 6.2 1.1 6.1-0.6 4-10.1 3.1-0.1 10.5 0.6 5.8-0.4 3.9-2.1 3.2-10.6 1.1-0.3 1.7 2.2 4.6 3.8 5.2 2.9-0.6-5.3 0.7-5.3 4.9-3.9 0.5-3.9 1.1-1.1 1.2-0.8 1.4-1.2 27.3 22.2 0.2 0.4 1.7 2.7 2.5 3.3 5 4.7 3.1 4-2.7 1.5-0.1 0-1.5-0.7-0.2-0.1-0.1 0-2.4-3.1-1.3-0.7-4.2-0.7-1.8 0.5 0.9 1.9 0.3 0.6 11.9 11.2 4.7 2.6-1.8-2.9-1.1-2.7 0.5-1.9 3.2-0.8 1.5 1 2.5 7.3 2.2 4.4 8.8 17.6-1.8-0.6-4.9-1.9-3 0-1.3 3.3 1.8 0.8 3.7 0.7 3.4 2.1 0 0.3 0.5 5 1.6 0 0.7-1.3 0.7-0.6 0.8-0.4 1.1-0.7 1.1 4.6 0.2 0.6 3.2 7.5 4.4 6.7 4.5 2.9 0.3 0.3 0.5 0.4 0 1.7-1.1 1.6-2.1 0.8-0.6-0.7-2.6-4.1-2.7-1.5-6.3-1.6-3.7-1.7 1.7 2.4 0.9 1.3 8.3 7.8 0 0.8z"
                    >
                      <title>Mullaitivu</title>
                    </path>
                    {/* Mannar */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'mannar' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('mannar')}
                      aria-label="Mannar"
                      d="M366 183.9l0.3 8 1.4 7.6 4.2 6.8 0.5 1.6 0.2 1.8-0.1 3.5-0.9 3.4 0.5 5.5-0.3 4.8-5.1 1.7-1 2.3-0.8 2.6-1.2 2.6-0.8 2.7 1.1 2.1 1.1 1.6-3 8.4 38.1-2 6.2 2.9 3.6 5.7 3.5 9-1.2 8.1-12.3 4.6-13 1.6-8.4-0.9-6.4 3.6-3.5 7.8-5.9 0.6-0.9 3.5 0 3 5.4 4.2 8.8 11.3-22.5 5.9-11.3-0.1-10.2-4.2 1.8 13.7-0.5 21.6-2.2-0.3-1.9-0.9-6.2-3.5-5.9-2.5-6.8-0.6-6.1-2.3-2.6-1.6 0.9-0.9 0.3-1.2 2.3-7.1 0.3-0.3 0.2-0.2 0.5-2 2.2-4.7 2-22.7-5.5-14.5 0.4-2.5 0.4-16.5 0-0.2-0.5-5.6-0.7-2.7-1.2-2-1-2.4 2.2-1.1 3.1-0.6 2-0.6 13.4-12.1 7-3.5 2.9-2.5 1.5-5.7 2.8-5.9 1.5-8.1 7.5-19.2 0.2-1.1 0.7-2.8 1.7 0 7.9-0.7 4.9-2.5 4.4-3.3z m-110.1 37.7l-2.6-1-1.1-2.2 0.7-2.3 3-1 10.3 0 4.6 1.2 4.7 1.2 9.8 3.8 9.4 5.4 7.9 7.7-0.1 0-3.7-0.8-6.7-3.3-3.9-0.7 6 6.8 4.7 5.4 2.1 3.7-5.5-0.7-3.6-2.8-2.5-3-1.9-1.4-2.3-1.2-9.5-8.5-4.7-2.1-4.8-2.2-3.4-0.9-1.8-0.5-5.1-0.6z"
                    >
                      <title>Mannar</title>
                    </path>
                    {/* Vavuniya */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'vavuniya' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('vavuniya')}
                      aria-label="Vavuniya"
                      d="M498.3 254l-1.9 3.4-1 4-6.3 1.2-6.1 1.8-6.7 4.7-17.1 0.6 0.4 5.1 6 2.1 4.2 5.5 2 6-5.5 4.4-3.3 3.9-2.8 4.3-5 5.9-5.8 5.3-6.2 4.7-7.3 0-3.9-2.8-4.3-2.2-7 3.2-9.1 11.8-4.3 10.1-4.1 1.8-3.5 6.3-2.2-0.1-2.4-0.7-4.9-2.6-2.4-4.9-0.9-3.2-1.5-2.8-3.4-1.6-3.5-1.2-2.3-6.6-0.1-7.5-8.8-11.3-5.4-4.2 0-3 0.9-3.5 5.9-0.6 3.5-7.8 6.4-3.6 8.4 0.9 13-1.6 12.3-4.6 1.2-8.1-3.5-9-3.6-5.7-6.2-2.9 10.7-6.8 6.4-5.2 4.1-6.3-0.2-3.9-0.9-4 0-2.1-0.2-1.9-3.4-0.5-1.8-2.5 0.6-3.4 4.2-0.4 4.4 0.3 8-0.2 5.7 3.6 3.6 5.3 5.6-2.5 4-3.5 2.3-1.1 2.2-1.3 0.4-1.2 0.5-1.1 7.5-0.2 7.2 2.7 0.8 7.5 6.2 0.7 2.7 4.7-2.2 3.3-0.4 3.2 3.6-0.9 3.4-2.3 7.2 1.1 7.4 4.5 2.8 3.7-4.3 15.8z"
                    >
                      <title>Vavuniya</title>
                    </path>
                    {/* Trincomalee */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'trincomalee' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('trincomalee')}
                      aria-label="Trincomalee"
                      d="M534.5 241.9l0.1 3.6 2.7 2-2.4 2.3-2.2 2.6 3.6 2.8 3.9-0.3 3.2-2.9 2.4-4.2 1.5-3.9 0.1 0.1 8.3 10.1 7.4 12.7 3 3.1 4.2 1.3 3.4 2.7 5 12.1 1.2 1.3 1.3 1.4 0.1 0 5.6 2.6 2.9 6 3.2 12.2 0.6-2.2 0.7-0.9 1.3 0.3 2.2 1.2-0.6 2.3 6.4 7 2.1 3.5 0 4.2-1.7 1.7-2.4 1.1-2.2 2.5 0.1 0 1.6-0.4 1.8-0.5 0.4-0.2 0.8-0.5 0.1 0.1 5 10.9 0.7 5.6-5.7 1-0.1 0 1.2-3.8-1.5-3-2.6-0.4-1.8 4 0.6 3.1 1.7 2.2 0.9 2.4-1.7 3.5-1.4-1-2.5-1.9-4-2.5-4-1-3.9 1.7-3 4 1.1 2.1 3.6-0.5 4.8-4 3.3 3.5 2.9 4.2 3.6 3.5 5.1 1.5 10.6-0.2 3.6-2.3-2.4-5.4 6.1-2.8 2.4-0.8 2.5 0.2 0.1 0 2.8 1.6 2.5 2.8 1.9 3.2 1.7 9.3 3.6 12 0.1 3.1 0.1 3.2-2.9-2.1-3.1-6.2-2.7-1.3-0.1 1.7 1.1 7.6 0.1 0.5 1.3 2.9 1.5 0.8 1.4 0.6 0.1 0 3.1 0 2.4 1.2 1.5 8.9 1.8 6.2 0.3 1 0.5 3.8-20.7-2.2-3.9 1.3-3.5 0-2.9 0-2.1 2.3-1.5 2.8-1.8 1.3-1.6 1.4-1.4 6.1-1.2 2.2-3.3 7.6-5.7 1.4-1.2-0.4-0.9-0.7 2.7-1.7 1.2-2.9-0.8-4.4 0.1-3-0.3-2.9-1.7-2.4-2.9 0.3-4.1-2.1-3.7-2.9-3.8-2.2-4.1 0-17.5-4.3-9.7 1-2.9-2.9-0.9-4.9-3.6-2.7-3.7-1.5-2.7-4-3.5 1 5-17.9 0.6-2.9 0.9-2.8 2.9-2.8 3.2-2.2 1.9-3.4-1.5-3.6-2.7-2-2-2.7-3.3-7.7-6.1-9.1-0.9-5.6-2.5-2.4-1.9-2.2-0.2-4.8 3.5-8.3-1.7-4.9-4.3-9.4-0.1-10 3.9-5.8 2.7-6-2.2-1.7-1.9-2.5-3.5-3.9-10.1-7-5.8-3.4-6.8-0.1-6.5 2.6 1-4 1.9-3.4 9.1-4.2 10.6-1.4 4.5-1.3 4-2.3 4.4-1.3 3.6-1.6z"
                    >
                      <title>Trincomalee</title>
                    </path>
                    {/* Anuradhapura */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'anuradhapura' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('anuradhapura')}
                      aria-label="Anuradhapura"
                      d="M495.4 261.4l6.5-2.6 6.8 0.1 5.8 3.4 10.1 7 3.5 3.9 1.9 2.5 2.2 1.7-2.7 6-3.9 5.8 0.1 10 4.3 9.4 1.7 4.9-3.5 8.3 0.2 4.8 1.9 2.2 2.5 2.4 0.9 5.6 6.1 9.1 3.3 7.7 2 2.7 2.7 2 1.5 3.6-1.9 3.4-3.2 2.2-2.9 2.8-0.9 2.8-0.6 2.9-5 17.9-2.9 3.1-1.8 4.1-0.9 4.1-3 1.8-10.2 0-9.1 1.7-3.4 8.9-1.9 9.8-3.3 8.8-1.6 9.1-0.4 8.1 4.6 3.6-4.5 6.4-0.3 6.1-4.8 2-4.4 2.2-3 2.6-4.5 4.7-1.3 1-1.7-0.5-2.4 0-1.2 3.8 0 4.3-2.2 3.4-3 3 0.6 1.1 0.1 1.7-1.5 0.8-1.6 1.2-1.7 2.8-3.4 2.3-2.8-1.8-3.7-0.1-4.1 4.9-7.7 2.9-4.9 3.6-5.9-5.6 0.9-8.1-1.2-5.5-2.1-5.4-0.6-3.9-1.9-3.2-3.8-0.3-3.2-1.3-0.4-4.1 0.3-4.2-0.7-5 0.4-2.9 0-2.9-3.5-2.9-4.3 0.2-4.2-2.6-3.8-3.8-6.9-5.7-7.7-2.9-4.2-0.7-3.5-2.4-4.4-1.8-4.5-1.2-21.3-9.7-5-2.8-2.5-3.3-3.4-2.8-4.7 0.2-4.1-3.1-3.9 1.8-4.8 0-1.4-4.2-5.8-23.4-3.4-6.6 2.6-5.7 3.9-1.8 1-2.1 0.3-1.7 7.2-5.9 4.2-8.9-1.3-9.6 1.9 0.9 2.2 0.3 0.5-21.6-1.8-13.7 10.2 4.2 11.3 0.1 22.5-5.9 0.1 7.5 2.3 6.6 3.5 1.2 3.4 1.6 1.5 2.8 0.9 3.2 2.4 4.9 4.9 2.6 2.4 0.7 2.2 0.1 3.5-6.3 4.1-1.8 4.3-10.1 9.1-11.8 7-3.2 4.3 2.2 3.9 2.8 7.3 0 6.2-4.7 5.8-5.3 5-5.9 2.8-4.3 3.3-3.9 5.5-4.4-2-6-4.2-5.5-6-2.1-0.4-5.1 17.1-0.6 6.7-4.7 6.1-1.8 6.3-1.2z"
                    >
                      <title>Anuradhapura</title>
                    </path>
                    {/* Polonnaruwa */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'polonnaruwa' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('polonnaruwa')}
                      aria-label="Polonnaruwa"
                      d="M534.8 393.9l3.5-1 2.7 4 3.7 1.5 3.6 2.7 0.9 4.9 2.9 2.9 9.7-1 17.5 4.3 4.1 0 3.8 2.2 3.7 2.9 4.1 2.1 2.9-0.3 1.7 2.4 0.3 2.9-0.1 3 0.8 4.4-1.2 2.9-2.7 1.7 0.9 0.7 1.2 0.4 5.7-1.4 3.3-7.6 1.2-2.2 1.4-6.1 1.6-1.4 1.8-1.3 1.5-2.8 2.1-2.3 2.9 0 3.5 0 1.3 12.2-1.9 36.7 1.7 8.6 3.9 8.4 1.9 8.6-2.2 0.2-8.3-1.1-6.6 0.9-5.2 3.5-1.7 6.8-2.1 17.9 3.3 18-1 5.2 0.7 5.5-1.3 2.5-1.5 1.5-1 2.8-0.6 2.4-4.5-0.6-5.4-3.1-11.2-3.5-6.8-6.8-8.4-3.2-4.2 0.7-8.6 0.8-4.3 0-12 2.2-12.3-0.8-0.5 4.1-1 4.1-3.6-2.2-2-2.8-4.5 4.2-5.8 2.4-6.1-1.3-2.3-3.2 0.4-4.6-3.1-14.1 1.6-6.4 6.7-1.5 0.4-1.7 0.8-1.6 2.2-9.4 0.6-5.4 2.3-11 6.9-7.2-3.4-2.1-3.6-0.7-2.7-0.8-2.8 1.3-0.1 1.5-1.5 1-1.9-0.8-1.3-1.3 0.1-4.1-3.2-3.6-2-2 0.3-6.1 4.5-6.4-4.6-3.6 0.4-8.1 1.6-9.1 3.3-8.8 1.9-9.8 3.4-8.9 9.1-1.7 10.2 0 3-1.8 0.9-4.1 1.8-4.1 2.9-3.1z"
                    >
                      <title>Polonnaruwa</title>
                    </path>
                    {/* Puttalam */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'puttalam' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('puttalam')}
                      aria-label="Puttalam"
                      d="M301.7 339.1l2.6 1.6 6.1 2.3 6.8 0.6 5.9 2.5 6.2 3.5 1.3 9.6-4.2 8.9-7.2 5.9-0.3 1.7-1 2.1-3.9 1.8-2.6 5.7 3.4 6.6 5.8 23.4 1.4 4.2 4.8 0 3.9-1.8 4.1 3.1 4.7-0.2 3.4 2.8 2.5 3.3 0.5 4.4-0.1 4.7 2.4 9.2 0.8 4.6 2.2 4.1 3.2 1.1 2.7 1.8-0.6 2.8-0.9 3 0.2 6.3-0.2 5.3-1.7 2.6-1.4 2.7 2.8 5.2-2.9 2.2-4.8-2.7-1.3 2.3-0.1 2.8-1.8 1.9-1.4 0.4 0.2-0.4 0.2-0.4-3.4 1.6-1.4 3.2-0.4 2.4-0.9 2.1-4.9 2.5-1.1 2.4-0.6 2.5-2.8 1.9-3 1.6-0.9 2.5-0.4 2.8-2.2 5.6-0.7 6.2 1.2 2.6 0.9 2.4-1.6 2.2-2.5 1-3.3 0.3-3 0.9-1.6 2.7-1.1 3 2.8 0.7 1.3 2.2-2.8 1.5-3.3 0.8-1.6 2.3-0.9 2.7-3.5 5.9-2.5 6.4-0.4 8 0.4 8 8.5 45.8 0.6 13.8-4-1.6-3.4 2.2-2.7-0.4-1.8-2-4.5 0.6-4.3 1.1-5.5-0.2-9.9-73-1.4-3 0.9-1 0.7-0.1 1.7 1.1 0.4-4 1.1-4.7 0.3-2.2 0.3-2.3-1.3-3.5-1.8-3.2-0.3-2.1-0.3-2.1 0-8.6-5.3-26.1-0.7-3-2.7-5.7-2.3-12.1-3.8-9.5-5.8-26.2 0-7.5 1 0.5 0.1 0.1 0 0.2 0.5 0.8 0.8-4.3-1.2-13.8-1.2-4.1 3.8-2.5 3.6-4.7 2.6-5.3 1-4.4 1.1-2.9 6.8-10.8-0.1 0.2-3.4 8.2-4.4 7.7 1 1.9 0.2 0.4 1.7 1.8 2.2 0.8 2.8 0-2.3 6.4-2.3 4.6-1 0.8-1.1 0.1-0.8 0.7-0.4 2.4 0.2 5.6-0.2 1.7-3.9 12.4 0.2 2.4 0.3 4.6 4 4.8 1.1 1.3-4.6 9.7 7.4 5.4 10.7 0.8 5.4-3.9-1-4.1-1.8-3.2-0.6-1.3-0.9-1-2-2.6-2.3-1.5-0.7-2.5 7.8-14.8-0.3-2.7-1-2-1.2-1.7-0.7-1.7-0.2-2.8 0.3-4.9-0.1-1.9 0-0.1-0.1-0.4-0.6-1.6-0.4-0.4-0.5-0.4-0.4-1 0.4-2.6 1.1-2.2 3-3.9 0.7-2.6 0.5-4.9 2.1-9.7 2.2-22.8 1.4-2.6 1.5-1.3 1.2-1.5 0.5-3.4 0-9.7 1.3-4.8 3.1-3 3.8-2.6 2.1-2.3z"
                    >
                      <title>Puttalam</title>
                    </path>
                    {/* Kurunegala */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'kurunegala' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('kurunegala')}
                      aria-label="Kurunegala"
                      d="M308.3 641.1l-0.6-13.8-8.5-45.8-0.4-8 0.4-8 2.5-6.4 3.5-5.9 0.9-2.7 1.6-2.3 3.3-0.8 2.8-1.5-1.3-2.2-2.8-0.7 1.1-3 1.6-2.7 3-0.9 3.3-0.3 2.5-1 1.6-2.2-0.9-2.4-1.2-2.6 0.7-6.2 2.2-5.6 0.4-2.8 0.9-2.5 3-1.6 2.8-1.9 0.6-2.5 1.1-2.4 4.9-2.5 0.9-2.1 0.4-2.4 1.4-3.2 3.4-1.6-0.2 0.4-0.2 0.4 1.4-0.4 1.8-1.9 0.1-2.8 1.3-2.3 4.8 2.7 2.9-2.2-2.8-5.2 1.4-2.7 1.7-2.6 0.2-5.3-0.2-6.3 0.9-3 0.6-2.8-2.7-1.8-3.2-1.1-2.2-4.1-0.8-4.6-2.4-9.2 0.1-4.7-0.5-4.4 5 2.8 21.3 9.7 4.5 1.2 4.4 1.8 3.5 2.4 4.2 0.7 7.7 2.9 6.9 5.7 3.8 3.8 4.2 2.6 4.3-0.2 3.5 2.9 0 2.9-0.4 2.9 0.7 5-0.3 4.2 0.4 4.1 3.2 1.3 3.8 0.3 1.9 3.2 0.6 3.9 2.1 5.4 1.2 5.5-0.9 8.1 5.9 5.6-1.1 3.8 0.6 4.1 2 1.1 1.8 0.5 1.6 3.7 2.3 3.8 1.6 4 0 4 0.9 0.6 1.1 1.7 0.7 7.7 1.3 7.2 4.2 4.2-0.1 2.7-0.7 2.7 0.1 2.1-0.8 2-3.3 3-0.6 4.9 2.3 4.7 1.4 2.3 1.2 2.5 0.7 2.9-0.5 2.8-1.3 1.7-0.1 2.4-2.8 1.3-2.7 0.7 1.9 3 1.3 3.1-2.4 1.2-3.4-0.5-3.3 1.8 0.3 2.6-0.3 2.4-4-0.3-3.5-2.5-3.4 0-0.7 4.6-1 1.3-0.8 1.4 0.2 1.5 0.4 1.1-4.1 1.2-4.8-0.5-2.1-4.5-3.4-3.5-5.5-0.7-5.1 2-0.8 4.4 0.3 4.8-0.8 2.7-1.6 2.3-2.5 0.1-11.3 2.5-5.4 2.5-5 3.6-4.8 4.3-4.7 2.7-4-2.9-5.7-6.6-1.4-1.9-0.6-2-2.1-2.3-6.4 1.2-5.7 4-6.6 1.9-6.4-4.4-5.5 0.2-8.8 6.9-4.9 1.9z"
                    >
                      <title>Kurunegala</title>
                    </path>
                    {/* Matale */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'matale' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('matale')}
                      aria-label="Matale"
                      d="M549.8 537.3l-0.2 3.9 1.7 5.3 0.5 4.4-2.2 11.1-2.3 10.9 1.2 19-7.3-0.8-4.7 0.7-2.6 4.3-1.4 1.3-1.7 0.9-2.8-3.5-3.8 1.9-9.5-0.1-7.3 6.1-6.6 1-8.6-7.1-3.4-1.4-3.2 2-1.4 3.6 0.8 8.5-5 5.5-8.4-0.5-14.7-9.2-4.7-6.6 0.1-2.4 1.3-1.7 0.5-2.8-0.7-2.9-1.2-2.5-1.4-2.3-2.3-4.7 0.6-4.9 3.3-3 0.8-2-0.1-2.1 0.7-2.7 0.1-2.7-4.2-4.2-1.3-7.2-0.7-7.7-1.1-1.7-0.9-0.6 0-4-1.6-4-2.3-3.8-1.6-3.7-1.8-0.5-2-1.1-0.6-4.1 1.1-3.8 4.9-3.6 7.7-2.9 4.1-4.9 3.7 0.1 2.8 1.8 3.4-2.3 1.7-2.8 1.6-1.2 1.5-0.8-0.1-1.7-0.6-1.1 3-3 2.2-3.4 0-4.3 1.2-3.8 2.4 0 1.7 0.5 1.3-1 4.5-4.7 3-2.6 4.4-2.2 4.8-2 2 2 3.2 3.6-0.1 4.1 1.3 1.3 1.9 0.8 1.5-1 0.1-1.5 2.8-1.3 2.7 0.8 3.6 0.7 3.4 2.1-6.9 7.2-2.3 11-0.6 5.4-2.2 9.4-0.8 1.6-0.4 1.7-6.7 1.5-1.6 6.4 3.1 14.1-0.4 4.6 2.3 3.2 6.1 1.3 5.8-2.4 4.5-4.2 2 2.8 3.6 2.2 1-4.1 0.5-4.1 12.3 0.8 12-2.2z"
                    >
                      <title>Matale</title>
                    </path>
                    {/* Kandy */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'kandy' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('kandy')}
                      aria-label="Kandy"
                      d="M428.6 698.3l0.2-4.6 1.6-3.6-1.6-2.9-3.5-8.4 2.6-2.4 8-1.3 3.6-3.9 2.5-0.2 2.5-0.6 1.8-2.8 1.3-3.1-2.6-3.4-3.4-3.3 0-3.4 0.5-4.1-2.8-3.4-5.8-3.3-2-1.4 0.4-4.5-10-8.7-2.8-7.1 4.8 0.5 4.1-1.2-0.4-1.1-0.2-1.5 0.8-1.4 1-1.3 0.7-4.6 3.4 0 3.5 2.5 4 0.3 0.3-2.4-0.3-2.6 3.3-1.8 3.4 0.5 2.4-1.2-1.3-3.1-1.9-3 2.7-0.7 2.8-1.3 4.7 6.6 14.7 9.2 8.4 0.5 5-5.5-0.8-8.5 1.4-3.6 3.2-2 3.4 1.4 8.6 7.1 6.6-1 7.3-6.1 9.5 0.1 3.8-1.9 2.8 3.5 1.7-0.9 1.4-1.3 2.6-4.3 4.7-0.7 7.3 0.8 2 35.1 5 16.8-0.4 7.6-6.2 5.7-4.9 1.4-2.9 1.8-9.6-1.9-9.9 1.4-8.4-0.6-5.3-8.4-2-0.2-2.4-0.9-3.3-4.4-4-3.6 0.7 6.7 2.1 8.7-4.7 7.9-14.8 17.6-4-1-4.5 0.1-6.7 4.6-4.6 1-8.4-1-5.2 4.2 1.9-0.6 1.8 0.8 4.1 7.5 3.4 3.3 2.7 3.7-2.7 7.8-5 5.3-6.7-4-10.4-15.4-6.6-0.6z"
                    >
                      <title>Kandy</title>
                    </path>
                    {/* Nuwara Eliya */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'nuwaraeliya' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('nuwaraeliya')}
                      aria-label="Nuwara Eliya"
                      d="M508.4 753.2l-13.1 6.8-7.2 1-7.6-0.3-5.7 0.5-4.9 0.8-12.6-1.7-12-2.7-5.6-0.5-4.8-3.6 0.9-2.4 1.7-1.6-1.5-1.7 0.1-3.8 2.7-2.4-0.4-3.1-1.8-6.1-5.3-4-6.7-2.1-2-6.7 1.6-8.7-1.5-1.5-1.2-1.7 1.2-1.8 1.8-0.6 3.2-2.8 2-3.3-0.8-0.2-0.3-0.7 6.6 0.6 10.4 15.4 6.7 4 5-5.3 2.7-7.8-2.7-3.7-3.4-3.3-4.1-7.5-1.8-0.8-1.9 0.6 5.2-4.2 8.4 1 4.6-1 6.7-4.6 4.5-0.1 4 1 14.8-17.6 4.7-7.9-2.1-8.7-0.7-6.7 4 3.6 3.3 4.4 2.4 0.9 2 0.2 5.3 8.4 8.4 0.6 9.9-1.4 9.6 1.9-0.2 4.2 1.7 5.8-0.5 2.1 0.5 2 1 1.2 0.9 1.2-1.6 2-1.1 2.1 1.2 4.1 0.4 1.6-0.8 1.7-1.5 2-1.9 1.7-2.1 4.1-1 4.5-5.1 7.6-8.8 1.9-4.1 2-3.7 3.4-1.1 4.6-3.1 3.5-4.3-0.2-4.2 0.2 0.3 3.7 7.3 3.7 1.6 3.2 1.3 3.6 1.2 1.4 0.9 1.6-3.4 5.5 2.1 1.4 2.1 1-2.3 3.4-4.4 1.1z"
                    >
                      <title>Nuwara Eliya</title>
                    </path>
                    {/* Batticaloa */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'batticaloa' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('batticaloa')}
                      aria-label="Batticaloa"
                      d="M623.8 412.4l3.9-1.3 20.7 2.2 0.7 2.4 4.8 16.3 1.8 10.6-4.2 5.8-2.3-9.6-0.3-1.4-3.6-9.7-1.6 0-0.3 7.4 0.3 2.3-0.2-0.1-0.2 0.7 0 1.2 0.4 1.4 0.7 0.9 2 0.6 0.4 0.7 1.9 4.9 4 3 3.9-0.3 1.3-5 1.5 0 1.4 2.6 0.4 0.7 1.9 8.4 1.9 3.3 2.6 2.8 1.7 2.7 2.8 6.6 1.1-1.1 1.5-1.1 0.7-1.1 1 2.2-1 1.1 0.5 0.9 0.5 0.5 0 0.1 0.3 0.5 0.1 1.1 0.1-0.1 1.1-0.9 2.4-1.2 1.2-0.9 0.5 1.3 0.7 1.6-0.5 1.9-0.8 1.9 0 1.4 0.1 1.4 1.6 3.2 2.8 2.2 1.9 1.4 1.7 2.8-1.1 0.1-0.5 0.3-0.7 0.5-0.5 0.3-0.4 0.2-0.7 2.6-0.6 2.5 2.7 7.9 1.4 1.7 3.3 3.8 0.1 0 4.8-0.9 1.6 0 1.6 4.9 1.8 3 0.6 0.9 9.9 10.4 3.2 5.1 0.6 4.5-5.1 1.6-2.4-1.6-5.6-7.3-3-2.5-3.8-1.4-0.1 0-0.4 0-2.7 0.2-2.4 2.5-1.6 5.2 2.7 1.2 2.7 0.4 2.3-0.9 1.7-2.3 2.7 1 2.5 1.2 0.9 1.1 0.6 0.7-0.4 2.5 3.1 2.8 3 2.9 2.4 2.8 2.5 4.2-1.2 1.4-0.3 1.3 0.4 1.6 1.1 2.2 1.5-1.8-0.9-3.1 2.7 0.9 5.4 4 1.3 1.8 4.2 10.9-0.3 0.4-1.3 5.9 0.2 0.7 0 0.1 1.1 2.2 0.3 0.9-0.9 1.6-1.7 1.3-1 1.4 1.2 2.1 1.2 1.5 0.3 1.1 0.1 0.2 0.7 1.3 1.7 1.5-2.5 1.8 0.2 0.9-4.4 0.7-6.3 1-4.7 3.8-8.1 8-1.6-3.8-0.7-13.1-1.8-5.7-0.1-5.9-5.4 3.1-15.4 1.6-15.1-2.6-3.9-3.8-7.3-4.4-2.1-3.4-0.5-3.9 2.3-6.8 0.3-6.9-7.3-1.5-7-2-5.1-4.8-7.9-11.5-6.1-2-7.4 0.4-6.3-1.2-3.3-18 2.1-17.9 1.7-6.8 5.2-3.5 6.6-0.9 8.3 1.1 2.2-0.2-1.9-8.6-3.9-8.4-1.7-8.6 1.9-36.7-1.3-12.2z m98.8 139l-0.4-2.5-0.9-1.9-1.1-2.3-0.7-2.3 0.1-2.4 0.7-2.1 0.3-2.3-1.1-2.7 2.9 2.9 2.9 6.7 2 3.1 0.5 1.3 2.2 5.8 5.6 8.9 2.6 4.2 3.9 20.2 0 0.1-0.2 4.6-3.4 2.8-3.2-2.5-1-1.1-0.5-0.5-0.1-1.1-0.2-1.2 0-0.5 1-14.6-0.7-5-2.5-2.2-1-2.1-7.7-11.3z"
                    >
                      <title>Batticaloa</title>
                    </path>
                    {/* Ampara */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'ampara' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('ampara')}
                      aria-label="Ampara"
                      d="M716.5 818.5l-2.1-0.6-5.6-1.8-3.8-4.4-3-0.4-2.6-0.2-6.9-8.5 6-85.1-1.2-4.6-2.7-4 0-4.5-1.6-4.4 1-4.6 0.5-4.4-6.8-4.1-8.2-2.1-1.2-1.1-1.5-0.8-1.7 0-1.8-0.8-1.8-3.2-1-3.6-2.9-5.5 2.7-7.2 4.8-5.7 3.7-2.9-5-7-0.7-5-3.2-5.6-5.1-4.4-0.9-4.5 0.3-5.6-2.7-12.2 0.4-3.1-1.5-0.3-1.4-0.9 3.4-5.3-4.6-1.2-5.7 3.1-2.8 1-2.6 1.1-0.8 2.2-1.6 2.5-3.2 0.8-2.3 0.2 0 3 1.3 2.7 0.2 2.8-1 2.3-1.6 1.9-1.1 1.6-4.7 2.6-5.7-0.2 0.1 8.9 1.2 8.7-4.3 3.1-4.7 1.6-2-3.8-1.8-4.4-0.8-4.2-2.1-4.2-1.6-2.7-1-2.1-2.8-0.5-2 0.5-3.4-3.4-2.6-5.5-1.5-10.2-0.9-2.9-0.7-2.9 0.6-2.1 1.3-2.4 2.4-11.3-0.8-11.6-10.3-2.2-11.3 6.3-4.9 4.6-2.8 1.1-2.3 0.5-4.2 1.5-5.7-9.5-1.8-5.6-0.3-3.8-1.5-3.3-3.5-2.1-0.6-0.6 2.2-11.1-0.5-4.4-1.7-5.3 0.2-3.9 4.3 0 8.6-0.8 4.2-0.7 8.4 3.2 6.8 6.8 11.2 3.5 5.4 3.1 4.5 0.6 0.6-2.4 1-2.8 1.5-1.5 1.3-2.5-0.7-5.5 1-5.2 6.3 1.2 7.4-0.4 6.1 2 7.9 11.5 5.1 4.8 7 2 7.3 1.5-0.3 6.9-2.3 6.8 0.5 3.9 2.1 3.4 7.3 4.4 3.9 3.8 15.1 2.6 15.4-1.6 5.4-3.1 0.1 5.9 1.8 5.7 0.7 13.1 1.6 3.8 8.1-8 4.7-3.8 6.3-1 4.4-0.7 0.2 0.9 1.9 0.4 1.9-2.4 1.4 0 1.8 9.4-0.1 3.4 1.6 0 0-0.1 0.2-3.2 0.6-3.2 0.9-2.8 1.5-1.9 0-1.6-0.2-0.4-0.5-1.4 0.4-0.8 1.3 0.6 2.1 2 0.7 1.8 0.5 5 3.6 5.6 5.7 19.8-1.1 54.6 0.6 3.7 2.4 8.2 0.3 4.8-1.3 9.3-10.6 36.8-0.6 3.8-0.2 5-0.8 4.2-3.3 6.5-0.8 2.9-1.3 4-4.4 7-2.1 3.3 1.5 5.6-2.5 6.7-14.6 23.2z"
                    >
                      <title>Ampara</title>
                    </path>
                    {/* Badulla */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'badulla' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('badulla')}
                      aria-label="Badulla"
                      d="M549.6 562l0.6 0.6 3.5 2.1 1.5 3.3 0.3 3.8 1.8 5.6 5.7 9.5 4.2-1.5 2.3-0.5 2.8-1.1 4.9-4.6 11.3-6.3 10.3 2.2 0.8 11.6-2.4 11.3-1.3 2.4-0.6 2.1 0.7 2.9 0.9 2.9 1.5 10.2 2.6 5.5 3.4 3.4 2-0.5 2.8 0.5 1 2.1 1.6 2.7 2.1 4.2 0.8 4.2-9 2.1 0 4.8-1.8 4.4-6.3 8-2.1 3.6-3.8 1.6-3.2-3.5-3.8-0.5-2.7 4.1-0.7 4.7 2.9 3.7 3.5 3.5 2.3 4.8 2.7 2.8 8.5-2.2 2.5 3.2 1.2 1.1 1.7 2.1 1.2 3.1 0.7 3.2 0 4.3-1.1 4.2-0.9 6.4-1.2 2.6-1.6 2.4-0.6 3.6-1.1 3.4-3 0.6-2.3-1-1.4 1.4-1.1 1.9-2.3 2.9-2.9 2.4-5.9 1.6-4.9 2.7 5.6 7.9-6.7 2-2 3.9-7.8 0.7-0.6 4.9 0.5 5-2 4.2 0.9 3 4.1 1.1 0.3 4.1-3.4 5.3-0.5 3.4 0 3.6 2.2 6.4 3.4 5.4-4.8 1.7-0.7 5.5-2.5-1.2-2.5-1.6-3.3 5.1-0.9 6.2-2-3.3-2.6-3.3-1-7.4-1.6-0.9-1.6-0.8-1.6-5.1-2.1-4.7-1.9-0.4-1.8-1-1.1-4-1.7-2.7-2.8-0.2-4.2 0.2-4.7 3.5-5.5 2.3-5.3-1-3.5-2.9-2.5-3.8 1.1-3.1 6.3-2.8 0.9-0.9 0.7-1.8 0.5-2.2-3.9-1.2-3.2-3.5-1.7 0.7-1.7 0.8-0.6-8.5 4.4-1.1 2.3-3.4-2.1-1-2.1-1.4 3.4-5.5-0.9-1.6-1.2-1.4-1.3-3.6-1.6-3.2-7.3-3.7-0.3-3.7 4.2-0.2 4.3 0.2 3.1-3.5 1.1-4.6 3.7-3.4 4.1-2 8.8-1.9 5.1-7.6 1-4.5 2.1-4.1 1.9-1.7 1.5-2 0.8-1.7-0.4-1.6-1.2-4.1 1.1-2.1 1.6-2-0.9-1.2-1-1.2-0.5-2 0.5-2.1-1.7-5.8 0.2-4.2 2.9-1.8 4.9-1.4 6.2-5.7 0.4-7.6-5-16.8-2-35.1-1.2-19 2.3-10.9z"
                    >
                      <title>Badulla</title>
                    </path>
                    {/* Monaragala */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'monaragala' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('monaragala')}
                      aria-label="Monaragala"
                      d="M692.5 802.6l-4.1 4.9-6.2 1.1-4.9 3.7-4.2 4.1-5.5 2.4-4.5 3.7 0.1 3.9 1.1 3.1-1 1.7-1 1.4 0.1 1.9 0 2-3 4.9-6.4-1.4-6.1 2.2-2.1-0.3-0.5-0.6-2.6 1.8-13.7 5.3-6.7 1.8-3.5 1.4-2.3 2.3-6.3 3.5-5.7-2.4-3.6-6-4.3-5.7-2.9 0.4-2.1 1.5-2.5 0.1-2.3-0.4-1.7-4.2-3.9-1.4-5.8-0.7-5.8 0-2.1 2.5-2.9-2 0.1 3.1-1.9 2.6-3.2 0.3-2.9 0-1.1 5.2 2.2 5.2-5 3.8-6.5 2.1-5.8 3.2-5.7 3.7-1.8-5.4-2.2-4.2-4.2-3-4.4-2.4-3.3-4.3-2.5-5-0.2-14.3-1.5-3.7-0.7-3.8 3.5-6.6 4.4-6.2 2.2-10 2.2-5.2 4.3-5.1 2.3-5.9 3.8-5.8 2.8 0.2 1.7 2.7 1.1 4 1.8 1 1.9 0.4 2.1 4.7 1.6 5.1 1.6 0.8 1.6 0.9 1 7.4 2.6 3.3 2 3.3 0.9-6.2 3.3-5.1 2.5 1.6 2.5 1.2 0.7-5.5 4.8-1.7-3.4-5.4-2.2-6.4 0-3.6 0.5-3.4 3.4-5.3-0.3-4.1-4.1-1.1-0.9-3 2-4.2-0.5-5 0.6-4.9 7.8-0.7 2-3.9 6.7-2-5.6-7.9 4.9-2.7 5.9-1.6 2.9-2.4 2.3-2.9 1.1-1.9 1.4-1.4 2.3 1 3-0.6 1.1-3.4 0.6-3.6 1.6-2.4 1.2-2.6 0.9-6.4 1.1-4.2 0-4.3-0.7-3.2-1.2-3.1-1.7-2.1-1.2-1.1-2.5-3.2-8.5 2.2-2.7-2.8-2.3-4.8-3.5-3.5-2.9-3.7 0.7-4.7 2.7-4.1 3.8 0.5 3.2 3.5 3.8-1.6 2.1-3.6 6.3-8 1.8-4.4 0-4.8 9-2.1 1.8 4.4 2 3.8 4.7-1.6 4.3-3.1-1.2-8.7-0.1-8.9 5.7 0.2 4.7-2.6 1.1-1.6 1.6-1.9 1-2.3-0.2-2.8-1.3-2.7 0-3 2.3-0.2 3.2-0.8 1.6-2.5 0.8-2.2 2.6-1.1 2.8-1 5.7-3.1 4.6 1.2-3.4 5.3 1.4 0.9 1.5 0.3-0.4 3.1 2.7 12.2-0.3 5.6 0.9 4.5 5.1 4.4 3.2 5.6 0.7 5 5 7-3.7 2.9-4.8 5.7-2.7 7.2 2.9 5.5 1 3.6 1.8 3.2 1.8 0.8 1.7 0 1.5 0.8 1.2 1.1 8.2 2.1 6.8 4.1-0.5 4.4-1 4.6 1.6 4.4 0 4.5 2.7 4 1.2 4.6-6 85.1z"
                    >
                      <title>Monaragala</title>
                    </path>
                    {/* Gampaha */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'gampaha' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('gampaha')}
                      aria-label="Gampaha"
                      d="M282.1 640.8l5.5 0.2 4.3-1.1 4.5-0.6 1.8 2 2.7 0.4 3.4-2.2 4 1.6 4.9-1.9 8.8-6.9 5.5-0.2 6.4 4.4 6.6-1.9 5.7-4 6.4-1.2 2.1 2.3 0.6 2 1.4 1.9 5.7 6.6 4 2.9 0.4 3.1-2.3 1.8-0.6 8-3 2.8-3.6 1.9-1 6.6 2.8 5.8 5.6-1.3 4.9 1.4-1.7 3.9-3.4 2.4-2.9 6.7-1.2 6.8 3.4 11 0.1 2.1-0.7 1.9-4.2 1.5-6.2-0.6-4.6 2.1-3.7 3.6-0.9 4.4-0.3 4.5-4.9 0.3-4.1-0.5-2.7-1.1-2.6-1.4-2.7-2.5-3.1-1.9-3.9 0.2-4 0.8-11.5-3.3-2.1 0.8-1.8 1-4.1-1-3.8-2-4.9-1.9 2.3-5.5 0.6-2.6-0.1-2.7 0-0.1-11-39.2 1.5-5.8-0.1 3.6 0.9 2.2 1.2 1.7 1.1 2.1 2.2 7.7 1.1 1.9 1.4 0 0.4-2.2 0.6-0.9 0.6-0.2 0.2 0.1-0.1-7.1-0.5-3.1-1.2-2.6-1.1-0.7-3-0.7-1.3-0.9-0.2-0.3-0.8-1.7 0.4-1.9 0.8-1.7 0.5-1.6-1.4-10z"
                    >
                      <title>Gampaha</title>
                    </path>
                    {/* Colombo */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'colombo' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('colombo')}
                      aria-label="Colombo"
                      d="M287.1 713l4.9 1.9 3.8 2 4.1 1 1.8-1 2.1-0.8 11.5 3.3 4-0.8 3.9-0.2 3.1 1.9 2.7 2.5 2.6 1.4 2.7 1.1 4.1 0.5 4.9-0.3 0.3-4.5 0.9-4.4 3.7-3.6 4.6-2.1 6.2 0.6 4.2-1.5 5 0.4 4 2 0.7 4.2-3.1 2.9 0.3 2.2 0.1 2.3-2.9 3.6-2.5 4-1 3.2-1.2 2.8 5.7 6-5.1 4.6-6.7-1.6-7.5 3.2 1.5 6.7-4.5-1.2-3-6.9-1.2-0.7-1.5-0.3-2.8 3.3-3.6 1.8-2.5-1.1-2.6 0.3-8.9 7.6-2.5 1.1-2.7 0.7-6.7 2.5-10.6-6.7-0.3 3.9 1.4 4.3 0.7 3 0.1 2.9-0.1 0.1-0.4 0.6-8.6-22.1-3.1-17.5-0.3-1.7 0-16.7 0.3-0.7z"
                    >
                      <title>Colombo</title>
                    </path>
                    {/* Kegalle */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'kegalle' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('kegalle')}
                      aria-label="Kegalle"
                      d="M363.2 710l0.7-1.9-0.1-2.1-3.4-11 1.2-6.8 2.9-6.7 3.4-2.4 1.7-3.9-4.9-1.4-5.6 1.3-2.8-5.8 1-6.6 3.6-1.9 3-2.8 0.6-8 2.3-1.8-0.4-3.1 4.7-2.7 4.8-4.3 5-3.6 5.4-2.5 11.3-2.5 2.5-0.1 1.6-2.3 0.8-2.7-0.3-4.8 0.8-4.4 5.1-2 5.5 0.7 3.4 3.5 2.1 4.5 2.8 7.1 10 8.7-0.4 4.5 2 1.4 5.8 3.3 2.8 3.4-0.5 4.1 0 3.4 3.4 3.3 2.6 3.4-1.3 3.1-1.8 2.8-2.5 0.6-2.5 0.2-3.6 3.9-8 1.3-2.6 2.4 3.5 8.4 1.6 2.9-1.6 3.6-0.2 4.6 0.3 0.7 0.8 0.2-2 3.3-3.2 2.8-1.8 0.6-1.2 1.8 1.2 1.7 1.5 1.5-1.6 8.7 2 6.7 6.7 2.1 5.3 4 1.8 6.1 0.4 3.1-2.7 2.4-4.6 0.1-4.5-0.6-6.4-2.2-4.9-2.8-3.5-0.1-2.9 0.3-7 4-5.8-1.3-1.1-2.3-1.6-2-2.4 0.5-1.6 0.9-3.6-2.7-2.8-3.7-9.6-9.7-3.6 1.6-0.1-2.3-0.3-2.2 3.1-2.9-0.7-4.2-4-2-5-0.4z"
                    >
                      <title>Kegalle</title>
                    </path>
                    {/* Kalutara */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'kalutara' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('kalutara')}
                      aria-label="Kalutara"
                      d="M298.8 771.7l0.4-0.6 0.1-0.1-0.1-2.9-0.7-3-1.4-4.3 0.3-3.9 10.6 6.7 6.7-2.5 2.7-0.7 2.5-1.1 8.9-7.6 2.6-0.3 2.5 1.1 3.6-1.8 2.8-3.3 1.5 0.3 1.2 0.7 3 6.9 4.5 1.2-1.5-6.7 7.5-3.2 6.7 1.6 0.8 4.7 4 10.7-0.3 3.7 1.4 4.4 2.3 4.6 7 6.8 1.4 6.8 2.5 2.4 3.2 1.2 5.2 4.7 3.3 6.4-3.5 1.4 1.3 3.9 9.7 13.7 8.3 14.5-8.2 1.9-8 5-4.3 1.9 0 4.9 1.7 5.1-0.4 4.6-3.6-2.8-3.6-3.5-6.8-5.2-7 0.6-6.3 3.5-9.9-1.9-3.9-2.6-3.7-3.2-4.6-2-4.2-0.9-8.4-3.9-1.2-2-1.7-1.6-2.3 0.9-1.5 1-1.4-1.2-1.2-1.7-1.6-0.4-1-4-0.5-0.4-1-0.6-1-0.9-0.6-1.2 0.2-1.4 1.1-0.3 1.2 0.1 0.6 0-1.8-12.2-0.1-1-4.8-12.3-11.2-28.7z"
                    >
                      <title>Kalutara</title>
                    </path>
                    {/* Ratnapura */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'ratnapura' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('ratnapura')}
                      aria-label="Ratnapura"
                      d="M363.2 748.2l5.1-4.6-5.7-6 1.2-2.8 1-3.2 2.5-4 2.9-3.6 3.6-1.6 9.6 9.7 2.8 3.7 3.6 2.7 1.6-0.9 2.4-0.5 1.6 2 1.1 2.3 5.8 1.3 7-4 2.9-0.3 3.5 0.1 4.9 2.8 6.4 2.2 4.5 0.6 4.6-0.1-0.1 3.8 1.5 1.7-1.7 1.6-0.9 2.4 4.8 3.6 5.6 0.5 12 2.7 12.6 1.7 4.9-0.8 5.7-0.5 7.6 0.3 7.2-1 13.1-6.8 0.6 8.5 1.7-0.8 1.7-0.7 3.2 3.5 3.9 1.2-0.5 2.2-0.7 1.8-0.9 0.9-6.3 2.8-1.1 3.1 2.5 3.8 3.5 2.9 5.3 1 5.5-2.3 4.7-3.5 4.2-0.2-3.8 5.8-2.3 5.9-4.3 5.1-2.2 5.2-2.2 10-4.4 6.2-3.5 6.6 0.7 3.8 1.5 3.7 0.2 14.3 2.5 5 3.3 4.3 4.4 2.4 4.2 3 2.2 4.2 1.8 5.4 4.3 4.7 2.1 5.9-1.1 4.1-4.9-1.6-8.4-1.7-2.7-3.1-3.5-2.8-4.4 0.4-4.4 1.1-4.5-0.7-16.9-6.1-13.1-2.6 0-2.2 1.2-1.2-3-2.2 0.2-2.2-2.6-3.2-5.5 0.9-4.1-0.7 1.5-4.1-3.3-6.2-10.2 1.4-3.9 0-1.6 3.8-4.5 1-4.5 0.7-2-2.9-3.7 0.1-7.2-3.5-3.4-0.1-3.9-1.6-3.2-2.7-2.8-2.9-8.3-14.5-9.7-13.7-1.3-3.9 3.5-1.4-3.3-6.4-5.2-4.7-3.2-1.2-2.5-2.4-1.4-6.8-7-6.8-2.3-4.6-1.4-4.4 0.3-3.7-4-10.7-0.8-4.7z"
                    >
                      <title>Ratnapura</title>
                    </path>
                    {/* Galle */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'galle' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('galle')}
                      aria-label="Galle"
                      d="M317.7 834.6l1.6 0.4 1.2 1.7 1.4 1.2 1.5-1 2.3-0.9 1.7 1.6 1.2 2 8.4 3.9 4.2 0.9 4.6 2 3.7 3.2 3.9 2.6 9.9 1.9 6.3-3.5 7-0.6 6.8 5.2 3.6 3.5 3.6 2.8 0.4-4.6-1.7-5.1 0-4.9 4.3-1.9 8-5 8.2-1.9 2.8 2.9 3.2 2.7 3.9 1.6 3.4 0.1 7.2 3.5 3.7-0.1 2 2.9-4.8 1.4-3.1 3.1 2.7 4.2 3.6 3.5-1.4 6.6-7.1-1.6-4.4-4.2-4.9-3.6-3.8-1.2-3.7 1 2.3 4.3 4.6 2.9 4.8 7 1.8 6.6-4.1 5-8.1-1.4 2.4 2.8 1.1 3.8-1.6 4.8-2.1 4.5 1.5 4.5 3.5 3.4 4.1 2.8 3.7 3.3-3.2 3.7-3.6 3.7-3.2 1.3-1.4 2.2 0.7 2.4 1.8 1 4.1 1.7-1.4 2.8-4.2 1.5-2.5 4.5 0 2.6 0.4 2.4 0.1 0.3-1.5-0.3-1.1-0.5-0.8-1-1-1.1-1.8-0.5-1 0.3-0.9 0.8-0.9 0.6-1.2 0-0.4-0.3-0.4-0.4-1.4-2-0.8-0.5-0.1-0.1-1.7-0.6-9.8-3.5-4.1-0.9-2.8-0.6-5-4-1.2-0.5-2.2-1.1-1.7 1.7-4.3-3.5-18.8-19.9-1.5-1.2-0.2-0.2-0.5-0.7-0.3-0.9 0.1-2-0.6-1-0.8-1.1-2.1-2.7-10.6-22.5-0.5-2.1 0.1-2 0-1.9-0.4-1.2-1.9-4-1.9-10.8-4.3-7.6-2.6-10.9z"
                    >
                      <title>Galle</title>
                    </path>
                    {/* Matara */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'matara' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('matara')}
                      aria-label="Matara"
                      d="M410.6 945.3l-0.1-0.3-0.4-2.4 0-2.6 2.5-4.5 4.2-1.5 1.4-2.8-4.1-1.7-1.8-1-0.7-2.4 1.4-2.2 3.2-1.3 3.6-3.7 3.2-3.7-3.7-3.3-4.1-2.8-3.5-3.4-1.5-4.5 2.1-4.5 1.6-4.8-1.1-3.8-2.4-2.8 8.1 1.4 4.1-5-1.8-6.6-4.8-7-4.6-2.9-2.3-4.3 3.7-1 3.8 1.2 4.9 3.6 4.4 4.2 7.1 1.6 1.4-6.6-3.6-3.5-2.7-4.2 3.1-3.1 4.8-1.4 4.5-0.7 4.5-1 1.6-3.8 3.9 0 10.2-1.4 3.3 6.2-1.5 4.1 4.1 0.7 5.5-0.9 2.6 3.2-0.2 2.2 3 2.2-1.2 1.2 0 2.2-2.2 0.9 0.4 1.7-1.6 4.1 1.6 3.7-8.9 6.7-2.8 9.9 4 2.9 4.4 1.6 2-0.3 1.3 1.2-1.1 2.4-1.4 2.1 0.8 4 3.8 2 2.7-0.4 2.5 0.5-0.8 2-2.1 2 2.5 8.9-7.5 3.2 0.6 3.7 3.2 2.1 2.2 0.2 2 1.1-0.1 1.9-1.7 0.9 2.8 4.2 5.8 2.7 1.3 0.7-3.5 4.1-9.5-0.5-3.9 0.5-3.1 1.2-3.2 1.8-5.6 4.2-1.6 0.4-1.6 0.3-3.8-1.4-4.1-2.1-2.3-0.7-1.6-0.5-13.4 1.6-3.8-0.8-1.9-1.9-1.2-2.5-1-1.5-0.7-1.1-3.9 2.3-3.5 0.3-6.2-0.9z"
                    >
                      <title>Matara</title>
                    </path>
                    {/* Hambantota */}
                    <path
                      className={`sl-district-path ${currentDistrict === 'hambantota' ? 'active' : ''}`}
                      onClick={() => setCurrentDistrict('hambantota')}
                      aria-label="Hambantota"
                      d="M490 942.5l-1.3-0.7-5.8-2.7-2.8-4.2 1.7-0.9 0.1-1.9-2-1.1-2.2-0.2-3.2-2.1-0.6-3.7 7.5-3.2-2.5-8.9 2.1-2 0.8-2-2.5-0.5-2.7 0.4-3.8-2-0.8-4 1.4-2.1 1.1-2.4-1.3-1.2-2 0.3-4.4-1.6-4-2.9 2.8-9.9 8.9-6.7-1.6-3.7 1.6-4.1-0.4-1.7 2.2-0.9 13.1 2.6 16.9 6.1 4.5 0.7 4.4-1.1 4.4-0.4 3.5 2.8 2.7 3.1 8.4 1.7 4.9 1.6 1.1-4.1-2.1-5.9-4.3-4.7 5.7-3.7 5.8-3.2 6.5-2.1 5-3.8-2.2-5.2 1.1-5.2 2.9 0 3.2-0.3 1.9-2.6-0.1-3.1 2.9 2 2.1-2.5 5.8 0 5.8 0.7 3.9 1.4 1.7 4.2 2.3 0.4 2.5-0.1 2.1-1.5 2.9-0.4 4.3 5.7 3.6 6 5.7 2.4 6.3-3.5 2.3-2.3 3.5-1.4 6.7-1.8 13.7-5.3 2.6-1.8 0.5 0.6 2.1 0.3 6.1-2.2 6.4 1.4 3-4.9 0-2-0.1-1.9 1-1.4 1-1.7-1.1-3.1-0.1-3.9 4.5-3.7 5.5-2.4 4.2-4.1 4.9-3.7 6.2-1.1 4.1-4.9 6.9 8.5 2.6 0.2 3 0.4 3.8 4.4 5.6 1.8 2.1 0.6-7.1 11.2-7.2 7.3-13.4 9.5-4.4 1.3-5.8 3.1-42.8 33.7-8.6 4.7-27.8 9.8-0.4-3.3 0-0.2-1.6-1.3-0.1 0-0.3 0.1-1.4 0.4-0.9 1.8-0.5 3.9-1.2 1.5-2 0.6-2.7 1.1-5 3.1-5 2.2-24 5.1-11.7 4-12.7 2.4-5.8 2.2-3.5 4.9-6.3-1.2-3.8 1.5-2.2 0.8-8.9 6.6-8.8 6.6-0.6 0.6z"
                    >
                      <title>Hambantota</title>
                    </path>
                  </g>

                 
                  {[
                    { id: 'jaffna', name: 'Jaffna', x: 380, y: 75, anchor: 'start', ox: 14 },
                    { id: 'kilinochchi', name: 'Kilinochchi', x: 415, y: 135, anchor: 'start', ox: 14 },
                    { id: 'mannar', name: 'Mannar', x: 315, y: 230, anchor: 'end', ox: -14 },
                    { id: 'mullaitivu', name: 'Mullaitivu', x: 500, y: 185, anchor: 'start', ox: 14 },
                    { id: 'vavuniya', name: 'Vavuniya', x: 435, y: 275, anchor: 'start', ox: 14 },
                    { id: 'anuradhapura', name: 'Anuradhapura', x: 425, y: 375, anchor: 'start', ox: 14 },
                    { id: 'trincomalee', name: 'Trincomalee', x: 560, y: 310, anchor: 'start', ox: 14 },
                    { id: 'polonnaruwa', name: 'Polonnaruwa', x: 545, y: 440, anchor: 'start', ox: 14 },
                    { id: 'puttalam', name: 'Puttalam', x: 315, y: 450, anchor: 'end', ox: -14 },
                    { id: 'matale', name: 'Matale', x: 470, y: 520, anchor: 'start', ox: 14 },
                    { id: 'kurunegala', name: 'Kurunegala', x: 370, y: 560, anchor: 'end', ox: -14 },
                    { id: 'batticaloa', name: 'Batticaloa', x: 650, y: 490, anchor: 'start', ox: 14 },
                    { id: 'kandy', name: 'Kandy', x: 455, y: 630, anchor: 'start', ox: 14 },
                    { id: 'ampara', name: 'Ampara', x: 640, y: 640, anchor: 'start', ox: 14 },
                    { id: 'badulla', name: 'Badulla', x: 555, y: 680, anchor: 'start', ox: 14 },
                    { id: 'nuwaraeliya', name: 'Nuwara Eliya', x: 480, y: 715, anchor: 'start', ox: 14 },
                    { id: 'kegalle', name: 'Kegalle', x: 380, y: 680, anchor: 'end', ox: -14 },
                    { id: 'gampaha', name: 'Gampaha', x: 320, y: 650, anchor: 'end', ox: -14 },
                    { id: 'colombo', name: 'Colombo', x: 295, y: 725, anchor: 'end', ox: -14 },
                    { id: 'kalutara', name: 'Kalutara', x: 325, y: 785, anchor: 'end', ox: -14 },
                    { id: 'monaragala', name: 'Monaragala', x: 585, y: 770, anchor: 'start', ox: 14 },
                    { id: 'ratnapura', name: 'Ratnapura', x: 435, y: 785, anchor: 'start', ox: 14 },
                    { id: 'hambantota', name: 'Hambantota', x: 535, y: 875, anchor: 'start', ox: 14 },
                    { id: 'galle', name: 'Galle', x: 360, y: 870, anchor: 'end', ox: -14 },
                    { id: 'matara', name: 'Matara', x: 430, y: 915, anchor: 'start', ox: 14 }
                  ].map((pin) => {
                    const isActive = currentDistrict === pin.id;
                    return (
                      <g
                        key={pin.id}
                        className={`map-pin ${isActive ? 'active' : ''}`}
                        transform={`translate(${pin.x}, ${pin.y})`}
                        onClick={() => setCurrentDistrict(pin.id)}
                      >
                        <circle className="pin-halo" r={24} />
                        <circle className="pin-dot" r={isActive ? 9.5 : 7.5} />
                        <text
                          textAnchor={pin.anchor as any}
                          x={pin.ox}
                          y={5}
                          style={isActive ? { fontWeight: 800, fill: '#70ff9a' } : {}}
                        >
                          {pin.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="map-hint">Click any district or pin to switch instantly</div>
              </div>

             
              <div className="price-column">
                <div className="town-control-bar">
                  <div className="control-selectors-row">
                  
                    <div className="search-group">
                      
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search vegetables, fruits, rice..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                  
                    <div className="control-group">
                      <label htmlFor="townSelect">District:</label>
                      <select
                        id="townSelect"
                        className="town-select"
                        value={currentDistrict}
                        onChange={(e) => setCurrentDistrict(e.target.value)}
                      >
                        {DISTRICT_LIST.map((distKey) => (
                          <option key={distKey} value={distKey}>
                            {DISTRICT_DISPLAY_NAMES[distKey].replace(" District", "")}
                          </option>
                        ))}
                      </select>
                    </div>

                   
                    <div className="control-group">
                      <label htmlFor="categorySelect">Category:</label>
                      <select
                        id="categorySelect"
                        className="town-select"
                        value={currentCategory}
                        onChange={(e) => setCurrentCategory(e.target.value as CategoryKey)}
                      >
                        <option value="all">All Categories</option>
                        <option value="vegetables">Fresh Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="tubers">Tubers & Roots</option>
                        <option value="grains_spices">Grains & Spices</option>
                      </select>
                    </div>
                  </div>

                  
                  <div className="category-pills">
                    {[
                      { key: 'all', label: 'All Products' },
                      { key: 'vegetables', label: 'Fresh Vegetables' },
                      { key: 'fruits', label: 'Fruits' },
                      { key: 'tubers', label: 'Tubers & Roots' },
                      { key: 'grains_spices', label: 'Grains & Spices' }
                    ].map((pill) => (
                      <button
                        key={pill.key}
                        className={`cat-pill ${currentCategory === pill.key ? 'active' : ''}`}
                        onClick={() => setCurrentCategory(pill.key as CategoryKey)}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </div>

              
                <div className="district-status-bar">
                  <div className="status-district-name">
                     {DISTRICT_DISPLAY_NAMES[currentDistrict] || currentDistrict.toUpperCase()} Market
                  </div>
                  <div className="status-item-count">
                    {filteredProducts.length} Items Listed Today
                  </div>
                </div>

                
                <div className="products-grid">
                  {filteredProducts.length === 0 ? (
                    <div
                      style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        padding: '50px 20px',
                        color: '#8ba898',
                        fontSize: '14px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '18px',
                        border: '1px dashed rgba(112,255,154,0.25)'
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
                      No grocery products found matching "{searchQuery}" in {currentDistrict.toUpperCase()}. Try clearing the search or choosing another category.
                    </div>
                  ) : (
                    filteredProducts.map((p, idx) => (
                      <div
                        key={`${p.name}-${idx}`}
                        className="product-price-card"
                        style={{
                          animation: `textAppear 0.4s ease ${idx * 0.04}s forwards`
                        }}
                      >
                        <div className="prod-img-box">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="prod-img"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = ITEM_IMG.carrots;
                            }}
                          />
                          <span className="prod-cat-badge">{p.categoryName}</span>
                          <span className="prod-fresh-badge">100% Fresh</span>
                        </div>
                        <div className="prod-info">
                          <h4 className="prod-name">{p.name}</h4>
                          <div className="price-container-inner">
                            <span className="price-currency">Rs.</span>
                            <span className="price-amount">{p.price}</span>
                            <span className="price-unit">/ {p.unit || 'kg'}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        <footer className="app-footer">
        <div className="footer-brand">
            <img
            src={"src/assets/sofengee.jpg"}
            alt="Sofengee"
            className="footer-logo"
            />

            <p>
            Solution by <span>Sofengiee</span>
            </p>
        </div>

        <div className="footer-divider"></div>

        <p className="footer-copyright">
            © 2026 Sofengiee. All rights reserved.
        </p>
        </footer>

        </section>
      </div>
    </div>
  );
};

export default AgriSmartApp;