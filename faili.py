vards = input(" Ievadi lietotāja vārdu")
with open ("name.txt", "a") as f:
    f.write(vards)   
print("Vārds ir saglabāts failā.")      